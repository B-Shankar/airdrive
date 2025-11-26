import { X } from 'lucide-react';
import { assets } from "../../assets/assets.js";
import { SIDE_MENU_DATA } from "../../assets/data/constants.js";
import NavLink from "./NavLink.jsx";
import CreditsDisplay from "./CreditsDisplay.jsx";

const MobileSidebar = ({ isOpen, onClose, credits, plan, loading, onCreditsClick }) => {
	return (
		<>
			{/* Overlay */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={onClose}
				/>
			)}

			{/* Sidebar */}
			<aside
				className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div className="flex flex-col h-full">
					{/* Sidebar Header */}
					<div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
						<div className="flex items-center gap-2">
							<img src={assets.logo} alt="AirDrive Logo" className="w-8 h-8" />
							<span className="text-xl font-bold text-gray-900 dark:text-white">
                                Air<span className="text-blue-500">Drive</span>
                            </span>
						</div>
						<button
							onClick={onClose}
							className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
						>
							<X size={20} className="text-gray-600 dark:text-gray-300" />
						</button>
					</div>

					{/* Credits Display - Mobile */}
					<CreditsDisplay
						credits={credits}
						plan={plan}
						loading={loading}
						variant="mobile"
						onClick={onCreditsClick}
					/>

					{/* Navigation Links */}
					<nav className="flex-1 overflow-y-auto p-4">
						<div className="space-y-2">
							{SIDE_MENU_DATA.map((item) => (
								<NavLink key={item.id} item={item} variant="mobile" />
							))}
						</div>
					</nav>

					{/* Sidebar Footer */}
					<div className="p-4 border-t border-gray-200 dark:border-gray-700">
						<div className="text-xs text-gray-500 dark:text-gray-400 text-center">
							© 2025 AirDrive
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default MobileSidebar;
