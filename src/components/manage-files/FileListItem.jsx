import { File, X } from 'lucide-react';

const FileListItem = ({ file, onRemove, disabled, formatFileSize, maxFileSize }) => {
	const isValidSize = file.size <= maxFileSize;

	return (
		<div
			className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
				isValidSize
					? 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-650'
					: 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
			}`}
		>
			<File
				size={20}
				className={isValidSize ? 'text-blue-600 dark:text-blue-400' : 'text-red-600 dark:text-red-400'}
			/>
			<div className="flex-1 min-w-0">
				<p
					className={`text-sm font-medium truncate ${
						isValidSize ? 'text-gray-900 dark:text-white' : 'text-red-900 dark:text-red-300'
					}`}
				>
					{file.name}
				</p>
				<div className="flex items-center gap-2 mt-1">
          <span
	          className={`text-xs ${
		          isValidSize
			          ? 'text-gray-500 dark:text-gray-400'
			          : 'text-red-600 dark:text-red-400 font-semibold'
	          }`}
          >
            {formatFileSize(file.size)}
          </span>
					{!isValidSize && (
						<span className="text-xs text-red-600 dark:text-red-400">• Exceeds 5MB limit</span>
					)}
				</div>
			</div>
			{!disabled && (
				<button
					onClick={onRemove}
					className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
					title="Remove file"
				>
					<X size={18} className="text-gray-500" />
				</button>
			)}
		</div>
	);
};

export default FileListItem;
