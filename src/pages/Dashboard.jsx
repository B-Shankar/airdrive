import {useAuth, useUser} from "@clerk/clerk-react";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useEffect} from "react";

const Dashboard = () => {
	const { user } = useUser();

	const { getToken } = useAuth();

	useEffect(() => {
		const displayToken = async () => {
			const token = await getToken();
			console.log("Bearer " +token);
		}
		displayToken();
	}, []);

	return (
		<DashboardLayout>
			{/* Dashboard Content */}
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Welcome back, {user?.firstName || 'User'}! 👋
				</h1>
				<p className="mt-2 text-gray-600 dark:text-gray-400">
					Here's your Air Drive dashboard
				</p>
			</div>

			{/* Dashboard Stats */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Stats Card 1 */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Total Files
					</h3>
					<p className="text-3xl font-bold text-blue-500">24</p>
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
						+3 from last week
					</p>
				</div>

				{/* Stats Card 2 */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Storage Used
					</h3>
					<p className="text-3xl font-bold text-blue-500">2.4 GB</p>
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
						of 10 GB available
					</p>
				</div>

				{/* Stats Card 3 */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
						Shared Files
					</h3>
					<p className="text-3xl font-bold text-blue-500">8</p>
					<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
						Across 5 folders
					</p>
				</div>
			</div>
		</DashboardLayout>
	);
};

export default Dashboard;
