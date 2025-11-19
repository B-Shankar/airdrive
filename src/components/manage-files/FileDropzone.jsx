import { Upload as UploadIcon } from 'lucide-react';

const FileDropzone = ({ isDragging, onDrop, onDragOver, onDragLeave, onClick, disabled }) => {
	return (
		<div
			onDrop={onDrop}
			onDragOver={onDragOver}
			onDragLeave={onDragLeave}
			onClick={onClick}
			className={`relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
				isDragging
					? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 scale-[1.02]'
					: 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-gray-50 dark:hover:bg-gray-800/50'
			} ${disabled ? 'pointer-events-none opacity-60' : ''}`}
		>
			<div className="flex flex-col items-center gap-4">
				<div className="p-5 bg-gray-100 dark:bg-gray-700 rounded-full">
					<UploadIcon size={40} className="text-gray-600 dark:text-gray-400" />
				</div>
				<div>
					<p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Click to upload or drag and drop
					</p>
					<p className="text-sm text-gray-500 dark:text-gray-400">
						PNG, JPG, PDF, DOC up to 10GB
					</p>
				</div>
			</div>
		</div>
	);
};

export default FileDropzone;
