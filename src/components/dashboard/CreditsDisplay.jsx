import {Coins, Wallet} from 'lucide-react';

const CreditsDisplay = ({ credits, variant = 'desktop', onClick }) => {
	if (variant === 'mobile') {
		return (
			<div
				onClick={onClick}
				className="mx-4 mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-md cursor-pointer hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-200"
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Wallet size={20} className="text-yellow-300" />
						<span className="font-semibold">Your Credits</span>
					</div>
					<span className="text-2xl font-bold">{credits}</span>
				</div>
			</div>
		);
	}

	return (
		<button
			onClick={onClick}
			className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white shadow-md hover:from-blue-600 hover:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 transition-all duration-200 cursor-pointer"
		>
			<Wallet size={18} className="text-yellow-300" />
			<span className="font-semibold text-sm">{credits}</span>
			<span className="text-xs opacity-90">Credits</span>
		</button>
	);
};

export default CreditsDisplay;
