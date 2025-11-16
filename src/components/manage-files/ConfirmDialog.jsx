import { X } from 'lucide-react';
import { useEffect } from 'react';

const ConfirmDialog = ({
	                       isOpen,
	                       onClose,
	                       onConfirm,
	                       title = 'Confirm Action',
	                       message = 'Are you sure you want to proceed?',
	                       confirmText = 'Confirm',
	                       cancelText = 'Cancel',
	                       confirmColor = 'blue',
	                       isLoading = false,
                       }) => {
	// Handle ESC key press
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === 'Escape' && !isLoading) {
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
	}, [isOpen, isLoading, onClose]);

	if (!isOpen) return null;

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget && !isLoading) {
			onClose();
		}
	};

	const confirmButtonColors = {
		blue: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
		red: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
		green: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
		purple: 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500',
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
			<div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full animate-slideUp">
				{/* Close Button */}
				<button
					onClick={onClose}
					disabled={isLoading}
					className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50 cursor-pointer"
					aria-label="Close"
				>
					<X size={24} />
				</button>

				{/* Content */}
				<div className="p-8">
					{/* Title */}
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
						{title}
					</h3>

					{/* Message */}
					<p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
						{message}
					</p>

					{/* Actions */}
					<div className="flex gap-3 justify-end">
						<button
							onClick={onClose}
							disabled={isLoading}
							className="px-6 py-2.5 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{cancelText}
						</button>
						<button
							onClick={onConfirm}
							disabled={isLoading}
							className={`px-6 py-2.5 text-white font-medium rounded-lg transition-colors focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${
								confirmButtonColors[confirmColor] || confirmButtonColors.blue
							}`}
						>
							{isLoading ? (
								<div className="flex items-center justify-center gap-2">
									<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									<span>Processing...</span>
								</div>
							) : (
								confirmText
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
