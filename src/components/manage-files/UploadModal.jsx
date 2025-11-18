import { useState, useRef } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { fileService} from "../../api/index.js";
import { useUserCredits} from "../../hooks/useUserCredits.js";
import FileDropzone from "./FileDropzone.jsx";
import FileListItem from "./FileListItem.jsx";
import UploadProgress from "./UploadProgress.jsx";
import ValidationAlert from "./ValidationAlert.jsx";
import UploadInfo from "./UploadInfo.jsx";

const UploadModal = ({ isOpen, onClose, onUploadSuccess, isPage = false }) => {
	const [selectedFiles, setSelectedFiles] = useState([]);
	const [isDragging, setIsDragging] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const [validationErrors, setValidationErrors] = useState([]);
	const fileInputRef = useRef(null);
	const { getToken } = useAuth();
	const { credits, fetchUserCredits } = useUserCredits();

	const MAX_FILES = 5;
	const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
	const MAX_TOTAL_SIZE = 25 * 1024 * 1024; // 25MB

	const formatFileSize = (bytes) => {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
		return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
	};

	const validateFiles = (files) => {
		const errors = [];

		if (files.length > credits) {
			errors.push({
				type: 'error',
				message: `Insufficient credits. You have ${credits} credit(s), but trying to upload ${files.length} file(s).`,
			});
		}

		const oversizedFiles = [];
		files.forEach((file) => {
			if (file.size > MAX_FILE_SIZE) {
				oversizedFiles.push({ name: file.name, size: formatFileSize(file.size) });
			}
		});

		if (oversizedFiles.length > 0) {
			oversizedFiles.forEach((file) => {
				errors.push({
					type: 'error',
					message: `"${file.name}" is ${file.size}. Maximum file size is 5MB.`,
				});
			});
		}

		const totalSize = files.reduce((sum, file) => sum + file.size, 0);
		if (totalSize > MAX_TOTAL_SIZE) {
			errors.push({
				type: 'error',
				message: `Total upload size must be less than 25MB. Current total: ${formatFileSize(totalSize)}.`,
			});
		}

		return errors;
	};

	const handleFileSelect = (e) => {
		const files = Array.from(e.target.files);
		addFiles(files);
		e.target.value = '';
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const files = Array.from(e.dataTransfer.files);
		addFiles(files);
	};

	const addFiles = (newFiles) => {
		setValidationErrors([]);
		if (newFiles.length === 0) return;

		let filesToAdd = newFiles;
		const exceededCount = newFiles.length - MAX_FILES;

		if (newFiles.length > MAX_FILES) {
			filesToAdd = newFiles.slice(0, MAX_FILES);
			const warningError = {
				type: 'warning',
				message: `You tried to upload ${newFiles.length} files, but maximum is ${MAX_FILES}. Only the first ${MAX_FILES} files have been added.`,
			};
			setValidationErrors([warningError]);
			toast.error(`Maximum ${MAX_FILES} files allowed! ${exceededCount} file(s) were not added.`, {
				duration: 5000,
			});
		}

		const errors = validateFiles(filesToAdd);
		if (errors.length > 0) {
			setValidationErrors((prev) => [...prev, ...errors]);
			toast.error(errors[0].message, { duration: 5000 });
			if (errors.some((e) => e.type === 'error')) return;
		}

		setSelectedFiles(filesToAdd);
		if (exceededCount === 0) {
			toast.success(`${filesToAdd.length} file(s) added successfully`);
		}
	};

	const removeFile = (index) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
		setValidationErrors([]);
		toast.success('File removed');
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleUpload = async () => {
		if (selectedFiles.length === 0) {
			toast.error('Please select files to upload');
			return;
		}

		const errors = validateFiles(selectedFiles);
		if (errors.length > 0) {
			setValidationErrors(errors);
			toast.error(errors[0].message);
			return;
		}

		setUploading(true);
		setUploadProgress(0);

		try {
			const token = await getToken();
			await fileService.uploadFiles(selectedFiles, token, (progressEvent) => {
				const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
				setUploadProgress(progress);
			});

			toast.success(
				`${selectedFiles.length} file(s) uploaded successfully! ${selectedFiles.length} credit(s) deducted.`,
				{ duration: 4000 }
			);

			await fetchUserCredits();
			setSelectedFiles([]);
			setUploadProgress(0);
			setValidationErrors([]);

			if (onUploadSuccess) onUploadSuccess();
		} catch (error) {
			console.error('Upload error:', error);
			if (error.response?.status === 402) {
				toast.error('Insufficient credits to upload files');
			} else if (error.response?.status === 413) {
				toast.error('Files too large. Maximum 25MB total');
			} else {
				toast.error('Failed to upload files. Please try again');
			}
			setUploading(false);
		}
	};

	if (!isOpen) return null;

	const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
	const hasErrorValidations = validationErrors.some((e) => e.type === 'error');
	const canUpload = selectedFiles.length > 0 && selectedFiles.length <= credits && !hasErrorValidations;

	const UploadContent = () => (
		<div className="p-6 md:p-8">
			{/* Validation Errors/Warnings */}
			{validationErrors.length > 0 && (
				<div className="mb-6 space-y-3">
					{validationErrors.map((error, index) => (
						<ValidationAlert key={index} type={error.type} message={error.message} />
					))}
				</div>
			)}

			{/* File Input */}
			<input
				ref={fileInputRef}
				type="file"
				multiple
				onChange={handleFileSelect}
				disabled={uploading}
				className="hidden"
			/>

			{/* Dropzone */}
			<FileDropzone
				isDragging={isDragging}
				onDrop={handleDrop}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onClick={() => !uploading && fileInputRef.current?.click()}
				disabled={uploading}
			/>

			{/* Selected Files List */}
			{selectedFiles.length > 0 && (
				<div className="mt-6">
					<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
						<h4 className="text-lg font-semibold text-gray-900 dark:text-white">
							Selected Files ({selectedFiles.length})
						</h4>
						<div className="flex items-center gap-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">
                Total: <span className="font-semibold text-gray-900 dark:text-white">{formatFileSize(totalSize)}</span>
              </span>
							<span className="text-gray-500 dark:text-gray-400">
                Credits: <span className="font-semibold text-blue-600 dark:text-blue-400">{selectedFiles.length}</span>
              </span>
						</div>
					</div>

					<div className="space-y-2 max-h-80 overflow-y-auto">
						{selectedFiles.map((file, index) => (
							<FileListItem
								key={index}
								file={file}
								onRemove={() => removeFile(index)}
								disabled={uploading}
								formatFileSize={formatFileSize}
								maxFileSize={MAX_FILE_SIZE}
							/>
						))}
					</div>

					{uploading && <UploadProgress progress={uploadProgress} fileCount={selectedFiles.length} />}
				</div>
			)}

			{/* Info Section */}
			{selectedFiles.length === 0 && !validationErrors.length && <UploadInfo maxFiles={MAX_FILES} credits={credits} />}

			{/* Actions */}
			<div className="mt-6 flex flex-col sm:flex-row gap-3">
				<button
					onClick={onClose}
					disabled={uploading}
					className="flex-1 px-6 py-3 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Cancel
				</button>
				<button
					onClick={handleUpload}
					disabled={!canUpload || uploading}
					className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
				>
					{uploading ? (
						<span>Uploading {uploadProgress}%...</span>
					) : (
						<span>
              Upload {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''}
            </span>
					)}
				</button>
			</div>
		</div>
	);

	if (isPage) return <UploadContent />;

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
			style={{
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				backdropFilter: 'blur(4px)',
				WebkitBackdropFilter: 'blur(4px)',
			}}
			onClick={(e) => {
				if (e.target === e.currentTarget && !uploading) onClose();
			}}
		>
			<div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full animate-slideUp max-h-[90vh] overflow-y-auto">
				<button
					onClick={onClose}
					disabled={uploading}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer z-10 disabled:opacity-50"
					aria-label="Close"
				>
					<X size={24} />
				</button>
				<UploadContent />
			</div>
		</div>
	);
};

export default UploadModal;
