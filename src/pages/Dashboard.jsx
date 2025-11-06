import DashboardNavbar from "../components/dashboard/DashboardNavbar.jsx";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
	const { user } = useUser();

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900">
			<DashboardNavbar />

			{/* Main Content */}
			<div className="pt-24 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							Welcome back, {user?.firstName || 'User'}! 👋
						</h1>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Here's your Air Drive dashboard
						</p>
					</div>

					{/* Dashboard Content */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Stats Card 1 */}
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								Total Files
							</h3>
							<p className="text-3xl font-bold text-blue-500">24</p>
						</div>

						{/* Stats Card 2 */}
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								Storage Used
							</h3>
							<p className="text-3xl font-bold text-blue-500">2.4 GB</p>
						</div>

						{/* Stats Card 3 */}
						<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
							<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
								Shared Files
							</h3>
							<p className="text-3xl font-bold text-blue-500">8</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
