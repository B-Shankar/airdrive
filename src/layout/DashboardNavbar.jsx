import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { SIDE_MENU_DATA } from "../assets/data/constants.js";
import { useUserCredits } from "../hooks/useUserCredits.js";
import Logo from "../components/dashboard/Logo.jsx";
import NavLink from "../components/dashboard/NavLink.jsx";
import CreditsDisplay from "../components/dashboard/CreditsDisplay.jsx";
import ThemeToggle from "../components/dashboard/ThemeToggle.jsx";
import ProfileButton from "../components/dashboard/ProfileButton.jsx";
import MobileSidebar from "../components/dashboard/MobileSidebar.jsx";
import CreditsModal from "../components/dashboard/CreditsModal.jsx";

const DashboardNavbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
	const location = useLocation();

	// Get credits from context
	const { credits, plan, loading } = useUserCredits();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [location.pathname]);

	return (
		<>
			<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				isScrolled
					? 'bg-white dark:bg-gray-900 shadow-md py-3'
					: 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-4'
			}`}>
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4">
							<Logo />
						</div>

						<div className="hidden lg:flex items-center gap-6">
							{SIDE_MENU_DATA.map((item) => (
								<NavLink key={item.id} item={item} variant="desktop" />
							))}
						</div>

						<div className="flex items-center gap-3">
							<CreditsDisplay
								credits={credits}
								plan={plan}
								loading={loading}
								variant="desktop"
								onClick={() => setIsCreditsModalOpen(true)}
							/>
							<ThemeToggle />
							<ProfileButton />

							<button
								onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
								className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
								aria-label="Toggle menu"
							>
								{isMobileMenuOpen ? (
									<X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
								) : (
									<Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
								)}
							</button>
						</div>
					</div>
				</div>
			</nav>

			<MobileSidebar
				isOpen={isMobileMenuOpen}
				onClose={() => setIsMobileMenuOpen(false)}
				credits={credits}
				plan={plan}
				loading={loading}
				onCreditsClick={() => {
					setIsMobileMenuOpen(false);
					setIsCreditsModalOpen(true);
				}}
			/>

			<CreditsModal
				isOpen={isCreditsModalOpen}
				onClose={() => setIsCreditsModalOpen(false)}
				credits={credits}
				plan={plan}
			/>
		</>
	);
};

export default DashboardNavbar;
