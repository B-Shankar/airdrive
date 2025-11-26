import { Link } from 'react-router-dom';
import { assets } from "../../assets/assets.js";

const Logo = () => {
	return (
		<Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
			<img src={assets.logo} alt="AirDrive Logo" className="w-8 h-8" />
			<span className="text-2xl font-bold text-gray-900 dark:text-white">
                Air<span className="text-blue-500">Drive</span>
            </span>
		</Link>
	);
};

export default Logo;
