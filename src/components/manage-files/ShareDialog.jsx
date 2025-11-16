import { X, Copy, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

const ShareDialog = ({ isOpen, onClose, shareLink, fileName }) => {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shareLink);
			setCopied(true);
			setTimeout(() => {
				setCopied(false);
			}, 2000);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	};

	const handleCopyButtonClick = () => {
		handleCopy();
		setTimeout(() => {
			onClose();
		}, 1000);
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
			style={{
				backgroundColor: 'rgba(255, 255, 255, 0.7)',
				backdropFilter: 'blur(4px)',
				WebkitBackdropFilter: 'blur(4px)',
			}}
			onClick={handleBackdropClick}
		>
			<div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full animate-slideUp">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors cursor-pointer"
					aria-label="Close"
				>
					<X size={24} />
				</button>

				{/* Content */}
				<div className="p-8">
					{/* Title */}
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
						Share File
					</h3>

					{/* Info Text */}
					<p className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 rounded-lg mb-4">
						Share this link with others to give them access to this file:
					</p>

					{/* Link Input with Copy Icon */}
					<div className="flex items-center gap-2 mb-4">
						<div className="flex-1 relative">
							<input
								type="text"
								value={shareLink}
								readOnly
								className="w-full px-4 py-3 pr-12 border-2 border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 select-all"
								onClick={(e) => e.target.select()}
							/>
							<button
								onClick={handleCopy}
								className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors cursor-pointer"
								title="Copy to clipboard"
							>
								{copied ? (
									<Check size={18} className="text-green-600 dark:text-green-400" />
								) : (
									<Copy size={18} className="text-gray-400" />
								)}
							</button>
						</div>
					</div>

					{/* Description */}
					<p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
						Anyone with this link can access this file.
					</p>

					{/* Actions */}
					<div className="flex gap-3 justify-end">
						<button
							onClick={onClose}
							className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
						>
							Close
						</button>
						<button
							onClick={handleCopyButtonClick}
							className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 flex items-center gap-2"
						>
							{copied ? (
								<>
									<Check size={18} />
									<span>Copied!</span>
								</>
							) : (
								<>
									<Copy size={18} />
									<span>Copy</span>
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShareDialog;
