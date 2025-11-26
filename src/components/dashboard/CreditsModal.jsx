import { X, Coins, Upload as UploadIcon, List, Wallet, ArrowRight, BookOpen, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CreditsModal = ({ isOpen, onClose, credits }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>
			{/* Modal Card */}
			<div
				className="relative w-full max-w-xs sm:max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden animate-fadeIn"
				onClick={e => e.stopPropagation()}
			>
				{/* Header */}
				<div className="flex items-center justify-between gap-2 bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 px-5 py-4">
					<div className="flex gap-3 items-center">
						<Wallet className="text-yellow-300" size={28} />
						<span className="text-lg font-bold text-white">Credits</span>
					</div>
					<button
						onClick={onClose}
						className="rounded-full bg-white/20 hover:bg-white/40 p-2 transition-colors"
						title="Close"
					>
						<X className="text-white" size={20} />
					</button>
				</div>
				{/* Balance */}
				<div className="text-center py-8 bg-blue-50/30 dark:bg-blue-900/20">
					<div className="mb-3 flex items-center justify-center gap-2">
						<Coins className="text-yellow-400" size={32} />
						<span className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">
                            {credits}
                        </span>
					</div>
					<div className="text-xs text-blue-600 dark:text-blue-300 mb-2 tracking-wide">
						≈ ${(credits * 0.1).toFixed(2)} USD
					</div>
					<Link
						to="/subscription"
						className="inline-flex items-center gap-1 bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-blue-700 font-semibold px-4 py-2 rounded-lg mt-2 transition-colors"
					>
						<PlusCircle size={18} />
						Get More Credits
					</Link>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-2 gap-3 px-4 py-6 sm:gap-4">
					<Link
						to="/transactions"
						className="flex flex-col items-center justify-center bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg p-4 transition-all shadow-sm"
					>
						<BookOpen size={22} className="text-blue-600 dark:text-blue-400 mb-2" />
						<span className="text-xs font-semibold text-gray-900 dark:text-white text-center">Credits&nbsp;History</span>
					</Link>
					<Link
						to="/upload"
						className="flex flex-col items-center justify-center bg-green-50 dark:bg-green-900/30 hover:bg-green-100 dark:hover:bg-green-800 rounded-lg p-4 transition-all shadow-sm"
					>
						<UploadIcon size={22} className="text-green-600 dark:text-green-400 mb-2" />
						<span className="text-xs font-semibold text-gray-900 dark:text-white text-center">Upload&nbsp;File</span>
					</Link>
					<Link
						to="/my-files"
						className="flex flex-col items-center justify-center bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-800 rounded-lg p-4 transition-all shadow-sm col-span-2"
					>
						<List size={22} className="text-purple-600 dark:text-purple-400 mb-2" />
						<span className="text-xs font-semibold text-gray-900 dark:text-white text-center">View All Files</span>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CreditsModal;
