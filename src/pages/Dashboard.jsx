import { useAuth, useUser } from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import { useEffect, useState } from "react";
import {
	Upload,
	Folder,
	TrendingUp,
	Clock,
	Download,
	Share2,
	File,
	Image as ImageIcon,
	Video,
	Music,
	FileText,
	Copy,
	Check
} from "lucide-react";
import fileService from "../api/services/fileService.js";
import { useUserCredits} from "../hooks/useUserCredits.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Dashboard = () => {
	const { user } = useUser();
	const { getToken } = useAuth();
	const { credits } = useUserCredits();
	const [recentFiles, setRecentFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [copiedId, setCopiedId] = useState(null);
	const [stats, setStats] = useState({
		totalFiles: 0,
		storageUsed: 0,
		sharedFiles: 0
	});

	useEffect(() => {
		fetchDashboardData();
	}, []);

	const fetchDashboardData = async () => {
		setLoading(true);
		try {
			const token = await getToken();
			const files = await fileService.getMyFiles(token);

			console.log('Fetched files:', files.length);

			const recent = files.slice(0, 5);
			setRecentFiles(recent);

			const totalSize = files.reduce((acc, file) => acc + (file.fileSize || file.size || 0), 0);
			const sharedCount = files.filter(file => file.isPublic || file.public).length;

			setStats({
				totalFiles: files.length,
				storageUsed: totalSize,
				sharedFiles: sharedCount
			});
		} catch (error) {
			console.error('Error fetching dashboard data:', error);
			toast.error('Failed to load dashboard data');
		} finally {
			setLoading(false);
		}
	};

	const formatFileSize = (bytes) => {
		if (!bytes) return '0 B';
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
		return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
	};

	const formatDate = (dateString) => {
		if (!dateString) return 'Unknown';

		const date = new Date(dateString);
		const now = new Date();
		const diffMs = now - date;
		const diffMins = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMs / 3600000);
		const diffDays = Math.floor(diffMs / 86400000);

		if (diffMins < 1) return 'Just now';
		if (diffMins < 60) return `${diffMins}m ago`;
		if (diffHours < 24) return `${diffHours}h ago`;
		if (diffDays < 7) return `${diffDays}d ago`;

		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	};

	const getFileIcon = (fileName) => {
		if (!fileName || typeof fileName !== 'string') {
			return <File size={20} className="text-gray-500" />;
		}

		const extension = fileName.split('.').pop()?.toLowerCase() || '';

		if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp'].includes(extension)) {
			return <ImageIcon size={20} className="text-purple-500" />;
		}
		if (['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'].includes(extension)) {
			return <Video size={20} className="text-blue-500" />;
		}
		if (['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'].includes(extension)) {
			return <Music size={20} className="text-green-500" />;
		}
		if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
			return <FileText size={20} className="text-amber-500" />;
		}
		return <File size={20} className="text-gray-500" />;
	};

	const handleCopyLink = (fileId) => {
		const link = `${window.location.origin}/file/${fileId}`;
		navigator.clipboard.writeText(link);
		setCopiedId(fileId);
		toast.success('Link copied!');

		setTimeout(() => {
			setCopiedId(null);
		}, 2000);
	};

	const handleDownload = (fileId) => {
		window.open(fileService.getDownloadUrl(fileId), '_blank');
	};

	const storagePercentage = (stats.storageUsed / (10 * 1024 * 1024 * 1024)) * 100;

	return (
		<DashboardLayout>
			{/* Welcome Section */}
			<div className="mb-6 sm:mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Welcome back, {user?.firstName || 'User'}! 👋
				</h1>
				<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
					Here's what's happening with your files today
				</p>
			</div>

			{/* Quick Actions */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
				<Link
					to="/upload"
					className="flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
				>
					<Upload size={20} className="mb-2" />
					<span className="text-xs sm:text-sm font-semibold">Upload</span>
				</Link>

				<Link
					to="/my-files"
					className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
				>
					<Folder size={20} className="mb-2 text-blue-500" />
					<span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">My Files</span>
				</Link>

				<Link
					to="/subscription"
					className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
				>
					<TrendingUp size={20} className="mb-2 text-green-500" />
					<span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">Upgrade</span>
				</Link>

				<Link
					to="/transactions"
					className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-200 dark:border-gray-700"
				>
					<Clock size={20} className="mb-2 text-purple-500" />
					<span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">History</span>
				</Link>
			</div>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
				{/* Total Files */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-3 sm:mb-4">
						<h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Total Files</h3>
						<div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
							<File className="text-blue-500" size={18} />
						</div>
					</div>
					<p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
						{loading ? '...' : stats.totalFiles}
					</p>
					<p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
						Across all folders
					</p>
				</div>

				{/* Storage Used */}
				<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 sm:p-6 border border-gray-200 dark:border-gray-700">
					<div className="flex items-center justify-between mb-3 sm:mb-4">
						<h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Storage Used</h3>
						<div className="p-2 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
							<Folder className="text-purple-500" size={18} />
						</div>
					</div>
					<p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
						{loading ? '...' : formatFileSize(stats.storageUsed)}
					</p>
					<div className="mt-3">
						<div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
							<span>{storagePercentage.toFixed(1)}% used</span>
							<span>10 GB</span>
						</div>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
							<div
								className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
								style={{ width: `${Math.min(storagePercentage, 100)}%` }}
							/>
						</div>
					</div>
				</div>

				{/* Credits */}
				<div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-md p-5 sm:p-6 text-white sm:col-span-2 lg:col-span-1">
					<div className="flex items-center justify-between mb-3 sm:mb-4">
						<h3 className="text-xs sm:text-sm font-medium text-blue-100">Available Credits</h3>
						<div className="p-2 bg-white/20 rounded-lg">
							<TrendingUp size={18} />
						</div>
					</div>
					<p className="text-2xl sm:text-3xl font-bold mb-1">{credits}</p>
					<Link
						to="/subscription"
						className="text-xs sm:text-sm text-blue-100 hover:text-white underline inline-block"
					>
						Get more credits →
					</Link>
				</div>
			</div>

			{/* Recent Files */}
			<div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
				<div className="px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
					<h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
						<Clock size={18} className="text-blue-500" />
						<span>Recent Files</span>
					</h2>
					<Link
						to="/my-files"
						className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
					>
						View all
					</Link>
				</div>

				<div className="p-4 sm:p-6">
					{loading ? (
						<div className="flex items-center justify-center py-8">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
						</div>
					) : recentFiles.length === 0 ? (
						<div className="text-center py-12">
							<File className="mx-auto h-12 w-12 text-gray-400 mb-3" />
							<p className="text-gray-500 dark:text-gray-400 mb-4">No files yet</p>
							<Link
								to="/upload"
								className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
							>
								<Upload size={16} />
								Upload your first file
							</Link>
						</div>
					) : (
						<div className="space-y-2 sm:space-y-3">
							{recentFiles.map((file) => {
								const fileName = file.fileName || file.name || 'Unknown File';
								const fileSize = file.fileSize || file.size || 0;
								const uploadDate = file.uploadedAt || file.updatedAt || file.createdAt;
								const isPublic = file.isPublic || file.public || false;
								const fileId = file.id || file._id;

								return (
									<div
										key={fileId}
										className="flex items-center gap-3 p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors border border-transparent hover:border-gray-200 dark:hover:border-gray-600"
									>
										{/* File Icon */}
										<div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center shadow-sm">
											{getFileIcon(fileName)}
										</div>

										{/* File Info */}
										<div className="flex-1 min-w-0">
											<p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
												{fileName}
											</p>
											<div className="flex flex-wrap items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatFileSize(fileSize)}
                                                </span>
												<span className="text-xs text-gray-400 dark:text-gray-500">•</span>
												<span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDate(uploadDate)}
                                                </span>
												{isPublic && (
													<>
														<span className="text-xs text-gray-400 dark:text-gray-500">•</span>
														<span className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                                                            <Share2 size={12} />
                                                            Public
                                                        </span>
													</>
												)}
											</div>
										</div>

										{/* Action Buttons - Always Visible */}
										<div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
											{isPublic && (
												<button
													onClick={() => handleCopyLink(fileId)}
													className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200 group relative"
													title="Copy share link"
												>
													{copiedId === fileId ? (
														<Check size={18} className="text-green-600 dark:text-green-400" />
													) : (
														<Copy size={18} className="text-blue-600 dark:text-blue-400" />
													)}
												</button>
											)}
											<button
												onClick={() => handleDownload(fileId)}
												className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-all duration-200"
												title="Download"
											>
												<Download size={18} className="text-gray-600 dark:text-gray-400" />
											</button>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Dashboard;
