import { assets} from "../../assets/assets.js";

const Loading = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
			<div className="text-center">
				{/* Logo */}
				<div className="mb-6 animate-pulse">
					<img src={assets.logo} alt="AirDrive" className="w-16 h-16 mx-auto mb-4" />
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						Air<span className="text-blue-500">Drive</span>
					</h1>
				</div>

				{/* Spinner */}
				<div className="relative w-16 h-16 mx-auto mb-4">
					<div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
				</div>

				<p className="text-gray-600 dark:text-gray-400">
					Preparing your secure workspace...
				</p>
			</div>
		</div>
	);
};

export default Loading;
