import { Cloud } from 'lucide-react';
import { useState, useEffect } from 'react';
import {assets} from "../../assets/assets.js";

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);

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
				? 'bg-white shadow-md py-3'
				: 'bg-white/80 backdrop-blur-sm py-4'
		}`}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between">
					{/* Logo */}
					<div className="flex items-center gap-2 cursor-pointer">
						{/*<Cloud className="w-8 h-8 text-blue-500" />*/}
						<img src={assets.logo} alt="AirDrive Logo" className="w-8" />
						<span className="text-2xl font-bold text-gray-900">
                            Air<span className="text-blue-500">Drive</span>
                        </span>
					</div>

					{/* Navigation Links - Hidden on mobile, visible on desktop */}
					<div className="hidden md:flex items-center gap-8">
						<a href="#features" className="text-gray-600 hover:text-blue-500 transition-colors duration-200 font-medium">
							Features
						</a>
						<a href="#pricing" className="text-gray-600 hover:text-blue-500 transition-colors duration-200 font-medium">
							Pricing
						</a>
						<a href="#testimonials" className="text-gray-600 hover:text-blue-500 transition-colors duration-200 font-medium">
							Testimonials
						</a>
					</div>

					{/* CTA Buttons */}
					<div className="flex items-center gap-3">
						{/*<button className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-500 transition-colors duration-200">*/}
						{/*	Sign In*/}
						{/*</button>*/}
						<button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-2.5 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 shadow-md hover:shadow-lg">
							Try it for free
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar