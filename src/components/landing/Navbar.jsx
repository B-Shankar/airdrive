import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from "../../context/ThemeContext";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const { darkMode, toggleTheme } = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
			isScrolled
				? 'bg-white dark:bg-gray-900 shadow-md py-3'
				: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4'
		}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center gap-2 cursor-pointer">
						<img src={assets.logo} alt="AirDrive Logo" className="w-8 h-8" />
						<span className="text-2xl font-bold text-gray-900 dark:text-white">
                      Air<span className="text-blue-500">Drive</span>
                   </span>
					</div>

					{/* Navigation Links - Hidden on mobile, visible on desktop */}
					<div className="hidden md:flex items-center gap-8">
						<a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
							Features
						</a>
						<a href="#pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
							Pricing
						</a>
						<a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 font-medium">
							Testimonials
						</a>
					</div>

					{/* CTA Buttons + Dark Mode Toggle */}
					<div className="flex items-center gap-3">
						{/* Dark Mode Toggle Button */}
						<button
							onClick={toggleTheme}
							className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
							aria-label="Toggle dark mode"
						>
							{darkMode ? (
								<Sun className="w-5 h-5 text-yellow-500" />
							) : (
								<Moon className="w-5 h-5 text-white-700" />
							)}
						</button>

						{/* Try it for free CTA Button */}
						<button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
							Try it for free
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
