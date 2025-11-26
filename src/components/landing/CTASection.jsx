import { useTheme } from "../../context/ThemeContext.jsx";
import { dark } from "@clerk/themes";

const CTASection = ({ openSignUp }) => {
	const { darkMode } = useTheme();

	const handleSignUp = () => {
		openSignUp({
			appearance: {
				baseTheme: darkMode ? dark : undefined,
			}
		});
	};

	return (
		<div className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700">
			<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
				<div>
					<h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
						<span className="block">Ready to get started?</span>
						<span className="block text-blue-100 dark:text-blue-200 mt-2">
                      Start sharing files securely today.
                   </span>
					</h2>
				</div>
				<div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
					<div className="inline-flex rounded-md shadow-lg">
						<button
							onClick={handleSignUp}
							className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 dark:text-blue-700 bg-white dark:bg-gray-100 hover:bg-blue-50 dark:hover:bg-gray-50 transition-colors duration-200 font-semibold cursor-pointer"
						>
							Sign up for free
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CTASection;
