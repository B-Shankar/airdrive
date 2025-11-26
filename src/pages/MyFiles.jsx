import { useState, useEffect, useRef } from 'react';
import {Search, Upload} from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import DashboardLayout from '../layout/DashboardLayout.jsx';
import FileCard from '../components/manage-files/FileCard.jsx';
import ViewToggle from '../components/manage-files/ViewToggle.jsx';
import ConfirmDialog from '../components/manage-files/ConfirmDialog.jsx';
import ShareDialog from '../components/manage-files/ShareDialog.jsx';
import { fileService } from '../api';
import {useNavigate} from "react-router-dom";

const MyFiles = () => {
	const navigate = useNavigate();
	const [files, setFiles] = useState([]);
	const [viewMode, setViewMode] = useState('list');
	const [searchQuery, setSearchQuery] = useState('');
	const [loading, setLoading] = useState(true);
	const [deleteDialog, setDeleteDialog] = useState({
		isOpen: false,
		fileId: null,
		fileName: '',
		isDeleting: false,
	});
	const [shareDialog, setShareDialog] = useState({
		isOpen: false,
		fileId: null,
		fileName: '',
		shareLink: '',
	});
	const { getToken } = useAuth();
	const effectRan = useRef(false);

	useEffect(() => {
		if (effectRan.current === false) {
			fetchFiles();
		}

		return () => {
			effectRan.current = true;
		};
	}, []);

	const fetchFiles = async () => {
		try {
			setLoading(true);
			const token = await getToken();
			const data = await fileService.getMyFiles(token);
			setFiles(data);
		} catch (error) {
			console.error('Error fetching files:', error);
			toast.error('Failed to load files');
		} finally {
			setLoading(false);
		}
	};

	const handleViewFile = async (fileId, fileName) => {
		try {
			const token = await getToken();
			const blob = await fileService.downloadFile(fileId, token);

			const url = window.URL.createObjectURL(blob);
			const newWindow = window.open(url, '_blank');

			if (newWindow) {
				setTimeout(() => {
					window.URL.revokeObjectURL(url);
				}, 100);
			} else {
				toast.error('Please allow popups to view files');
				window.URL.revokeObjectURL(url);
			}
		} catch (error) {
			console.error('Error viewing file:', error);
			toast.error('Failed to open file');
		}
	};

	const handleDownload = async (fileId, fileName) => {
		try {
			const token = await getToken();
			const blob = await fileService.downloadFile(fileId, token);

			const url = window.URL.createObjectURL(blob);
			const link = document.createElement('a');
			link.href = url;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(url);

			toast.success('File downloaded successfully');
		} catch (error) {
			console.error('Error downloading file:', error);
			toast.error('Failed to download file');
		}
	};

	const handleDeleteClick = (fileId, fileName) => {
		setDeleteDialog({
			isOpen: true,
			fileId,
			fileName,
			isDeleting: false,
		});
	};

	const handleDeleteConfirm = async () => {
		setDeleteDialog((prev) => ({ ...prev, isDeleting: true }));

		try {
			const token = await getToken();
			await fileService.deleteFile(deleteDialog.fileId, token);
			setFiles(files.filter((file) => file.id !== deleteDialog.fileId));
			toast.success('File deleted successfully');
			setDeleteDialog({ isOpen: false, fileId: null, fileName: '', isDeleting: false });
		} catch (error) {
			console.error('Error deleting file:', error);
			toast.error('Failed to delete file');
			setDeleteDialog((prev) => ({ ...prev, isDeleting: false }));
		}
	};

	const handleDeleteCancel = () => {
		if (!deleteDialog.isDeleting) {
			setDeleteDialog({ isOpen: false, fileId: null, fileName: '', isDeleting: false });
		}
	};

	const handleToggleSharing = async (fileId) => {
		try {
			const token = await getToken();
			const updatedFile = await fileService.toggleFilePublic(fileId, token);

			setFiles(files.map(file =>
				file.id === fileId ? updatedFile : file
			));

			toast.success(`File is now ${updatedFile.public ? 'public' : 'private'}`);
		} catch (error) {
			console.error('Error toggling file visibility:', error);
			toast.error('Failed to update file visibility');
		}
	};

	const handleShareLinkClick = (fileId, fileName) => {
		const shareLink = fileService.getShareLink(fileId);
		setShareDialog({
			isOpen: true,
			fileId,
			fileName,
			shareLink,
		});
	};

	const handleShareDialogClose = () => {
		setShareDialog({
			isOpen: false,
			fileId: null,
			fileName: '',
			shareLink: '',
		});
	};

	const filteredFiles = files.filter((file) =>
		file.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (loading) {
		return (
			<DashboardLayout>
				<div className="flex items-center justify-center h-64">
					<div className="flex flex-col items-center gap-3">
						<div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
						<p className="text-gray-600 dark:text-gray-400">Loading files...</p>
					</div>
				</div>
			</DashboardLayout>
		);
	}

	return (
		<DashboardLayout>
			<div className="mb-6 md:mb-8">
				{/* Flex container with wrap for mobile */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
							My Files
						</h1>
						<p className="mt-1 md:mt-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
							Manage your uploaded files ({files.length} {files.length === 1 ? 'file' : 'files'})
						</p>
					</div>

					{/* Upload Button - Full width on mobile, auto on larger screens */}
					<button
						onClick={() => navigate('/upload')}
						className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md cursor-pointer hover:shadow-lg sm:flex-shrink-0"
					>
						<Upload size={20} />
						<span>Upload Files</span>
					</button>
				</div>
			</div>

			{/* Search and View Toggle */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 md:p-4 mb-4 md:mb-6">
				<div className="flex items-center gap-3 md:gap-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
						<input
							type="text"
							placeholder="Search files..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
				</div>
			</div>

			{/* Files Display */}
			{viewMode === 'grid' ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
					{filteredFiles.length > 0 ? (
						filteredFiles.map((file) => (
							<FileCard
								key={file.id}
								file={file}
								viewMode="grid"
								onViewFile={() => handleViewFile(file.id, file.name)}
								onDownload={() => handleDownload(file.id, file.name)}
								onDelete={() => handleDeleteClick(file.id, file.name)}
								onToggleSharing={() => handleToggleSharing(file.id)}
								onCopyShareLink={() => handleShareLinkClick(file.id, file.name)}
							/>
						))
					) : (
						<div className="col-span-full text-center py-12">
							<div className="flex flex-col items-center gap-3">
								<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
									<Search size={32} className="text-gray-400" />
								</div>
								<p className="text-gray-500 dark:text-gray-400">
									{searchQuery ? 'No files found matching your search' : 'No files uploaded yet'}
								</p>
							</div>
						</div>
					)}
				</div>
			) : (
				<>
					{/* Desktop Table View */}
					<div className="hidden md:block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
						{filteredFiles.length > 0 ? (
							<table className="w-full">
								<thead>
								<tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Name
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Size
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Uploaded
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Sharing
									</th>
									<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
										Actions
									</th>
								</tr>
								</thead>
								<tbody>
								{filteredFiles.map((file) => (
									<FileCard
										key={file.id}
										file={file}
										viewMode="list"
										onViewFile={() => handleViewFile(file.id, file.name)}
										onDownload={() => handleDownload(file.id, file.name)}
										onDelete={() => handleDeleteClick(file.id, file.name)}
										onToggleSharing={() => handleToggleSharing(file.id)}
										onCopyShareLink={() => handleShareLinkClick(file.id, file.name)}
									/>
								))}
								</tbody>
							</table>
						) : (
							<div className="p-8 text-center">
								<div className="flex flex-col items-center gap-3">
									<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
										<Search size={32} className="text-gray-400" />
									</div>
									<p className="text-gray-500 dark:text-gray-400">
										{searchQuery ? 'No files found matching your search' : 'No files uploaded yet'}
									</p>
								</div>
							</div>
						)}
					</div>

					{/* Mobile Card View */}
					<div className="md:hidden space-y-3">
						{filteredFiles.length > 0 ? (
							filteredFiles.map((file) => (
								<FileCard
									key={file.id}
									file={file}
									viewMode="list"
									onViewFile={() => handleViewFile(file.id, file.name)}
									onDownload={() => handleDownload(file.id, file.name)}
									onDelete={() => handleDeleteClick(file.id, file.name)}
									onToggleSharing={() => handleToggleSharing(file.id)}
									onCopyShareLink={() => handleShareLinkClick(file.id, file.name)}
								/>
							))
						) : (
							<div className="text-center py-12">
								<div className="flex flex-col items-center gap-3">
									<div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
										<Search size={32} className="text-gray-400" />
									</div>
									<p className="text-gray-500 dark:text-gray-400">
										{searchQuery ? 'No files found matching your search' : 'No files uploaded yet'}
									</p>
								</div>
							</div>
						)}
					</div>
				</>
			)}

			{/* Delete Confirmation Dialog */}
			<ConfirmDialog
				isOpen={deleteDialog.isOpen}
				onClose={handleDeleteCancel}
				onConfirm={handleDeleteConfirm}
				title="Delete File"
				message={`Are you sure want to delete "${deleteDialog.fileName}"? This action cannot be undone.`}
				confirmText="Delete"
				cancelText="Cancel"
				confirmColor="red"
				isLoading={deleteDialog.isDeleting}
			/>

			{/* Share Link Dialog */}
			<ShareDialog
				isOpen={shareDialog.isOpen}
				onClose={handleShareDialogClose}
				shareLink={shareDialog.shareLink}
				fileName={shareDialog.fileName}
			/>
		</DashboardLayout>
	);
};

export default MyFiles;
