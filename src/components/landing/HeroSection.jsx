import { assets } from "../../assets/assets.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import { dark } from "@clerk/themes";
import Button from "../ui/Button.jsx";

const HeroSection = ({ openSignIn, openSignUp }) => {
	const { darkMode } = useTheme();

	const handleSignUp = () => {
		openSignUp({
			appearance: {
				baseTheme: darkMode ? dark : undefined,
			},
		});
	};

	const handleSignIn = () => {
		openSignIn({
			appearance: {
				baseTheme: darkMode ? dark : undefined,
			},
		});
	};

	return (
		<div className="relative pt-16">
			<div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 opacity-80 -z-10"></div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
					<div className="text-center">
						<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
							<span className="block">Share Files Quickly & Securely with</span>
							Air<span className="text-blue-500">Drive</span>
						</h1>
						<p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
							Experience seamless file upload, management & sharing with end-to-end encryption. Accessible anywhere, anytime.
						</p>

						<div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
							<div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
								<Button
									onClick={handleSignUp}
									variant="primary"
									size="lg"
									className="w-full"
								>
									Get Started
								</Button>
								<Button
									onClick={handleSignIn}
									variant="secondary"
									size="lg"
									className="w-full"
								>
									Sign In
								</Button>
							</div>
						</div>
					</div>
				</div>

				<div className="relative">
					<div className="rounded-lg shadow-xl overflow-hidden">
						<img
							src={assets.dashboard}
							alt="AirDrive Dashboard"
							className="w-full h-auto object-cover"
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-black/10 rounded-lg pointer-events-none"></div>
				</div>

				<div className="mt-8 text-center pb-12">
					<p className="text-base text-gray-500 dark:text-gray-400">
						All your files are encrypted and stored securely with enterprise-grade security protocols.
					</p>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;
