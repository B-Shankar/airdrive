import {
	Download,
	Share2,
	Trash2,
	Eye,
	Lock,
	Globe,
	ImageIcon,
	Video,
	Music,
	FileText,
	FileIcon,
	Copy
} from 'lucide-react';

const FileCard = ({ file, viewMode, onDownload, onDelete, onToggleSharing, onCopyShareLink, onViewFile }) => {
	const getFileIcon = (file) => {
		const extension = file.name.split('.').pop().toLowerCase();

		if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(extension)) {
			return <ImageIcon size={24} className="text-purple-500" />;
		}

		if (['mp4', 'webm', 'mov', 'avi', 'mkv'].includes(extension)) {
			return <Video size={24} className="text-blue-500" />;
		}

		if (['mp3', 'wav', 'ogg', 'flac', 'm4a'].includes(extension)) {
			return <Music size={24} className="text-green-500" />;
		}

		if (['pdf', 'doc', 'docx', 'txt', 'rtf'].includes(extension)) {
			return <FileText size={24} className="text-amber-500" />;
		}

		return <FileIcon size={24} className="text-purple-500" />;
	};

	const formatFileSize = (bytes) => {
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
		return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		const day = date.getDate();
		const month = date.toLocaleString('en-US', { month: 'short' });
		const year = date.getFullYear();
		return `${day} ${month} ${year}`;
	};

	if (viewMode === 'grid') {
		return (
			<div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
				{/* Main Card Content */}
				<div className="relative h-40 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center transition-all duration-300 md:group-hover:blur-sm">
					{getFileIcon(file)}

					{/* Privacy Icon - Top Right */}
					<div className="absolute top-3 right-3">
						{file.public ? (
							<Globe size={16} className="text-green-500" />
						) : (
							<Lock size={16} className="text-gray-400 dark:text-gray-500" />
						)}
					</div>
				</div>

				{/* File Info Section */}
				<div className="p-4 bg-white dark:bg-gray-800 transition-all duration-300 md:group-hover:blur-[2px]">
					<h3 className="font-medium text-gray-900 dark:text-white truncate text-sm mb-1">
						{file.name}
					</h3>
					<div className="flex items-center justify-between">
						<p className="text-xs text-gray-500 dark:text-gray-400">
							{formatFileSize(file.size)} · {formatDate(file.updatedAt)}
						</p>

						{/* Mobile Action Buttons - Always Visible on Mobile */}
						<div className="flex md:hidden items-center gap-1">
							<button
								onClick={onDownload}
								className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
								title="Download"
							>
								<Download size={16} className="text-green-600 dark:text-green-400" />
							</button>

							<button
								onClick={onViewFile}
								className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
								title="View"
							>
								<Eye size={16} className="text-gray-600 dark:text-gray-400" />
							</button>

							{file.public && (
								<button
									onClick={onCopyShareLink}
									className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
									title="Share Link"
								>
									<Share2 size={16} className="text-blue-600 dark:text-blue-400" />
								</button>
							)}

							<button
								onClick={onToggleSharing}
								className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
								title={file.public ? "Make Private" : "Make Public"}
							>
								{file.public ? (
									<Globe size={16} className="text-orange-500" />
								) : (
									<Lock size={16} className="text-gray-600 dark:text-gray-400" />
								)}
							</button>

							<button
								onClick={onDelete}
								className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
								title="Delete"
							>
								<Trash2 size={16} className="text-red-500" />
							</button>
						</div>
					</div>
				</div>

				{/* Desktop Hover Overlay - Hidden on Mobile */}
				<div
					className="hidden md:flex absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center z-10"
					style={{
						background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 70%, rgba(255, 255, 255, 0) 100%)',
						backdropFilter: 'blur(8px)',
						WebkitBackdropFilter: 'blur(8px)',
					}}
				>
					<div className="flex items-center gap-3 -mt-8">
						<button
							onClick={onDownload}
							className="p-3 bg-white dark:bg-gray-700 rounded-full hover:scale-110 transition-all cursor-pointer shadow-lg"
							title="Download"
						>
							<Download size={20} className="text-green-600 dark:text-green-400" />
						</button>

						<button
							onClick={onViewFile}
							className="p-3 bg-white dark:bg-gray-700 rounded-full hover:scale-110 transition-all cursor-pointer shadow-lg"
							title="View"
						>
							<Eye size={20} className="text-gray-600 dark:text-gray-400" />
						</button>

						{file.public && (
							<button
								onClick={onCopyShareLink}
								className="p-3 bg-white dark:bg-gray-700 rounded-full hover:scale-110 transition-all cursor-pointer shadow-lg"
								title="Share Link"
							>
								<Share2 size={20} className="text-blue-600 dark:text-blue-400" />
							</button>
						)}

						<button
							onClick={onToggleSharing}
							className="p-3 bg-white dark:bg-gray-700 rounded-full hover:scale-110 transition-all cursor-pointer shadow-lg"
							title={file.public ? "Make Private" : "Make Public"}
						>
							{file.public ? (
								<Globe size={20} className="text-orange-500" />
							) : (
								<Lock size={20} className="text-gray-600 dark:text-gray-400" />
							)}
						</button>

						<button
							onClick={onDelete}
							className="p-3 bg-white dark:bg-gray-700 rounded-full hover:scale-110 transition-all cursor-pointer shadow-lg"
							title="Delete"
						>
							<Trash2 size={20} className="text-red-500" />
						</button>
					</div>
				</div>
			</div>
		);
	}

	// List View - Desktop: Table Row, Mobile: Card
	return (
		<>
			{/* Desktop Table Row - Hidden on mobile */}
			<tr className="hidden md:table-row border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
				{/* Name Column */}
				<td className="px-6 py-4">
					<div className="flex items-center gap-3">
						<div className="flex-shrink-0">
							{getFileIcon(file)}
						</div>
						<span className="font-medium text-gray-900 dark:text-white truncate">
              {file.name}
            </span>
					</div>
				</td>

				{/* Size Column */}
				<td className="px-6 py-4 text-gray-600 dark:text-gray-400">
					{formatFileSize(file.size)}
				</td>

				{/* Uploaded Column */}
				<td className="px-6 py-4 text-gray-600 dark:text-gray-400">
					{formatDate(file.updatedAt)}
				</td>

				{/* Sharing Column */}
				<td className="px-6 py-4">
					<div className="flex items-center gap-2">
						{file.public ? (
							<>
								<button
									onClick={onToggleSharing}
									className="flex items-center gap-1 text-green-500 hover:underline cursor-pointer transition-all"
									title="Click to make private"
								>
									<Globe size={16} />
									<span className="text-sm font-medium">Public</span>
								</button>
								<button
									onClick={onCopyShareLink}
									className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors cursor-pointer"
									title="Copy share link"
								>
									<Share2 size={14} />
									<span className="font-medium">Share Link</span>
								</button>
							</>
						) : (
							<button
								onClick={onToggleSharing}
								className="flex items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:underline cursor-pointer transition-all"
								title="Click to make public"
							>
								<Lock size={16} />
								<span className="text-sm font-medium">Private</span>
							</button>
						)}
					</div>
				</td>

				{/* Actions Column */}
				<td className="px-6 py-4">
					<div className="flex items-center gap-2 justify-end">
						<button
							onClick={onDownload}
							className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
							title="Download"
						>
							<Download size={18} className="text-gray-600 dark:text-gray-400" />
						</button>
						<button
							onClick={onDelete}
							className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
							title="Delete"
						>
							<Trash2 size={18} className="text-red-500" />
						</button>
						<button
							onClick={onViewFile}
							className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
							title="View"
						>
							<Eye size={18} className="text-gray-600 dark:text-gray-400" />
						</button>
					</div>
				</td>
			</tr>

			{/* Mobile Card Layout - Only visible on mobile */}
			<div className="md:hidden bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 shadow-sm border border-gray-200 dark:border-gray-700">
				{/* File Info */}
				<div className="flex items-start gap-3 mb-3">
					<div className="flex-shrink-0 mt-1">
						{getFileIcon(file)}
					</div>
					<div className="flex-1 min-w-0">
						<h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 truncate">
							{file.name}
						</h3>
						<div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
							<span>{formatFileSize(file.size)}</span>
							<span>•</span>
							<span>{formatDate(file.updatedAt)}</span>
						</div>
					</div>
				</div>

				{/* Sharing Status */}
				<div className="mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
					{file.public ? (
						<div className="flex items-center gap-2 flex-wrap">
							<button
								onClick={onToggleSharing}
								className="flex items-center gap-1 text-green-500 hover:underline cursor-pointer"
							>
								<Globe size={16} />
								<span className="text-sm font-medium">Public</span>
							</button>
							<button
								onClick={onCopyShareLink}
								className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg cursor-pointer"
							>
								<Share2 size={14} />
								<span className="font-medium">Share Link</span>
							</button>
						</div>
					) : (
						<button
							onClick={onToggleSharing}
							className="flex items-center gap-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:underline cursor-pointer"
						>
							<Lock size={16} />
							<span className="text-sm font-medium">Private</span>
						</button>
					)}
				</div>

				{/* Action Buttons */}
				<div className="flex items-center justify-between gap-2">
					<button
						onClick={onViewFile}
						className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors cursor-pointer"
					>
						<Eye size={16} className="text-gray-600 dark:text-gray-400" />
						<span className="text-sm font-medium text-gray-900 dark:text-white">View</span>
					</button>
					<button
						onClick={onDownload}
						className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 rounded-lg transition-colors cursor-pointer"
					>
						<Download size={16} className="text-green-600 dark:text-green-400" />
						<span className="text-sm font-medium text-green-700 dark:text-green-400">Download</span>
					</button>
					<button
						onClick={onDelete}
						className="p-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors cursor-pointer"
						title="Delete"
					>
						<Trash2 size={16} className="text-red-500" />
					</button>
				</div>
			</div>
		</>
	);
};

export default FileCard;
