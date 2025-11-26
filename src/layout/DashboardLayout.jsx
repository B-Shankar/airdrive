import DashboardNavbar from "./DashboardNavbar.jsx";

const DashboardLayout = ({ children }) => {
	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			{/* Fixed Navbar */}
			<DashboardNavbar />

			{/* Main Content Area with padding for fixed navbar */}
			<main className="pt-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto py-6">
					{children}
				</div>
			</main>
		</div>
	);
};

export default DashboardLayout;
