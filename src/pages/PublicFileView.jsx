import { Download, Share2, Loader2, AlertCircle, Moon, Sun, FileText, Music, Video, FileIcon, Image as ImageIcon, File } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import fileService from '../api/services/fileService.js';
import ShareDialog from "../components/manage-files/ShareDialog.jsx";
import toast from 'react-hot-toast';
import {assets} from "../assets/assets.js";
import logo from "../assets/logo.png";

const PublicFileView = () => {
	const { fileId } = useParams();
	const [file, setFile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [downloading, setDownloading] = useState(false);
	const [error, setError] = useState(null);
	const [showShareDialog, setShowShareDialog] = useState(false);
	const [darkMode, setDarkMode] = useState(() => {
		return localStorage.getItem('theme') === 'dark' ||
			(!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
	});

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [darkMode]);

	useEffect(() => {
		fetchFileData();
	}, [fileId]);

	const fetchFileData = async () => {
		setLoading(true);
		setError(null);

		try {
			const data = await fileService.getPublicFile(fileId);
			setFile(data);
		} catch (err) {
			console.error('Error fetching file:', err);
			setError('File not found or is not publicly shared');
		} finally {
			setLoading(false);
		}
	};

	const handleDownload = async () => {
		setDownloading(true);
		try {
			await fileService.downloadFile(fileId, file.name);
			toast.success('Download completed!');
		} catch (error) {
			console.error('Download failed:', error);
			const downloadUrl = fileService.getDownloadUrl(fileId);
			window.open(downloadUrl, '_blank');
			toast.success('Download started!');
		} finally {
			setDownloading(false);
		}
	};

	const handleShareClick = () => {
		setShowShareDialog(true);
	};

	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	const formatDate = (dateString) => {
		if (!dateString) return 'N/A';
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric'
		});
	};

	const getFileIcon = (file) => {
		const extension = file.name.split('.').pop().toLowerCase();

		if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'bmp', 'ico'].includes(extension)) {
			return <ImageIcon size={40} className="text-purple-500" />;
		}

		if (['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv', 'wmv'].includes(extension)) {
			return <Video size={40} className="text-blue-500" />;
		}

		if (['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'].includes(extension)) {
			return <Music size={40} className="text-green-500" />;
		}

		if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(extension)) {
			return <FileText size={40} className="text-amber-500" />;
		}

		if (['zip', 'rar', '7z', 'tar', 'gz'].includes(extension)) {
			return <FileIcon size={40} className="text-orange-500" />;
		}

		if (['xls', 'xlsx', 'csv'].includes(extension)) {
			return <FileText size={40} className="text-green-600" />;
		}

		if (['ppt', 'pptx'].includes(extension)) {
			return <FileText size={40} className="text-red-500" />;
		}

		return <File size={40} className="text-gray-500" />;
	};

	const formatFileSize = (bytes) => {
		if (!bytes) return '0 B';
		if (bytes < 1024) return bytes + ' B';
		if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
		if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
		return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
				<div className="text-center">
					<Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin mx-auto mb-4" />
					<p className="text-gray-600 dark:text-gray-400 font-medium">Loading file...</p>
				</div>
			</div>
		);
	}

	if (error || !file) {
		return (
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
				<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700">
					<AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">File Not Found</h2>
					<p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
					<a href="/" className="inline-block px-6 py-3 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg transition-colors">
						Go to Home
					</a>
				</div>
			</div>
		);
	}

	const shareLink = window.location.href;
	const formattedSize = formatFileSize(file.size);

	return (
		<>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
				{/* Header */}
				<header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								{/*<Share2 className="text-blue-600 dark:text-blue-400" size={24} />*/}
								<img src={assets.logo} alt="AirDrive Logo" className="w-8 h-8" />
								<h1 className="text-xl font-semibold text-gray-900 dark:text-white">AirDrive</h1>
							</div>
							<div className="flex items-center gap-2">
								{/* Theme Toggle */}
								<button
									onClick={toggleDarkMode}
									className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
									aria-label="Toggle theme"
								>
									{darkMode ? (
										<Sun size={20} className="text-yellow-500" />
									) : (
										<Moon size={20} className="text-gray-700" />
									)}
								</button>
								{/* Share Button */}
								<button
									onClick={handleShareClick}
									className="flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg transition-colors text-sm font-medium border border-blue-200 dark:border-blue-800"
								>
									<Share2 size={16} />
									<span className="hidden sm:inline">Share Link</span>
								</button>
							</div>
						</div>
					</div>
				</header>

				{/* Main Content */}
				<main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
					{/* File Card */}
					<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
						{/* File Preview Section */}
						<div className="px-6 sm:px-8 pt-10 sm:pt-12 pb-6 sm:pb-8 text-center">
							{/* File Icon */}
							<div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-blue-50 dark:bg-blue-900/20 rounded-2xl mb-6">
								{getFileIcon(file)}
							</div>

							{/* File Name */}
							<h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-3 break-words px-2">
								{file.name}
							</h2>

							{/* File Meta */}
							<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
								{formattedSize} · Shared on {formatDate(file.updatedAt)}
							</p>

							{/* File Type Badge */}
							<div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs font-medium uppercase mb-6 sm:mb-8">
								{file.type?.split('/').join('/') || 'FILE'}
							</div>

							{/* Download Button */}
							<div>
								<button
									onClick={handleDownload}
									disabled={downloading}
									className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900 font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg dark:shadow-white/10"
								>
									{downloading ? (
										<>
											<Loader2 className="animate-spin" size={18} />
											<span>Downloading...</span>
										</>
									) : (
										<>
											<Download size={18} />
											<span>Download File</span>
										</>
									)}
								</button>
							</div>
						</div>

						{/* Divider */}
						<div className="border-t border-gray-200 dark:border-gray-700" />

						{/* File Information */}
						<div className="px-6 sm:px-8 py-6">
							<h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
								File Information
							</h3>

							<div className="space-y-3">
								<div className="flex items-center justify-between py-2">
									<span className="text-sm text-gray-500 dark:text-gray-400">File Name:</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white text-right break-all ml-4 max-w-xs sm:max-w-md">
                                        {file.name}
                                    </span>
								</div>

								<div className="flex items-center justify-between py-2">
									<span className="text-sm text-gray-500 dark:text-gray-400">File Type:</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {file.type}
                                    </span>
								</div>

								<div className="flex items-center justify-between py-2">
									<span className="text-sm text-gray-500 dark:text-gray-400">File Size:</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {formattedSize}
                                    </span>
								</div>

								<div className="flex items-center justify-between py-2">
									<span className="text-sm text-gray-500 dark:text-gray-400">Shared:</span>
									<span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {formatDate(file.updatedAt)}
                                    </span>
								</div>
							</div>
						</div>
					</div>

					{/* Info Banner */}
					<div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
						<div className="flex items-start gap-3">
							<AlertCircle className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" size={20} />
							<p className="text-sm text-blue-900 dark:text-blue-300">
								This file has been shared publicly. Anyone with this link can view and download it.
							</p>
						</div>
					</div>
				</main>
			</div>

			{/* Share Dialog */}
			<ShareDialog
				isOpen={showShareDialog}
				onClose={() => setShowShareDialog(false)}
				shareLink={shareLink}
				fileName={file.name}
			/>
		</>
	);
};

export default PublicFileView;
