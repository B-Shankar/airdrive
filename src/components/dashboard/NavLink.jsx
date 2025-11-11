import { Link, useLocation } from 'react-router-dom';

const NavLink = ({ item, variant = 'desktop' }) => {
	const location = useLocation();
	const Icon = item.icon;
	const isActive = location.pathname === item.path;

	if (variant === 'mobile') {
		return (
			<Link
				to={item.path}
				className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
					isActive
						? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 font-semibold shadow-sm'
						: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium'
				}`}
			>
				<Icon size={20} className={isActive ? 'text-blue-600 dark:text-blue-400' : ''} />
				<span>{item.label}</span>
				{isActive && (
					<div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
				)}
			</Link>
		);
	}

	return (
		<Link
			to={item.path}
			className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 font-medium ${
				isActive
					? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
					: 'text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
			}`}
		>
			<Icon size={18} />
			<span>{item.label}</span>
		</Link>
	);
};

export default NavLink;
