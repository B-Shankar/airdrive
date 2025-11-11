import { Files, Search, Grid, List } from 'lucide-react';
import DashboardLayout from "../layout/DashboardLayout.jsx";

const MyFiles = () => {
	const files = [
		{ id: 1, name: 'Project Proposal.pdf', size: '2.4 MB', date: '2 days ago', type: 'PDF' },
		{ id: 2, name: 'Design Mockups.fig', size: '15.8 MB', date: '5 days ago', type: 'Figma' },
		{ id: 3, name: 'Presentation.pptx', size: '8.2 MB', date: '1 week ago', type: 'PPTX' },
	];

	return (
		<DashboardLayout>
			<div className="mb-8 flex items-center justify-between">
				<div>
					<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
						My Files
					</h1>
					<p className="mt-2 text-gray-600 dark:text-gray-400">
						Manage your uploaded files
					</p>
				</div>
			</div>

			{/* Search and Filter */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
				<div className="flex items-center gap-4">
					<div className="flex-1 relative">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
						<input
							type="text"
							placeholder="Search files..."
							className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
						/>
					</div>
					<button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
						<Grid size={20} className="text-gray-600 dark:text-gray-400" />
					</button>
					<button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
						<List size={20} className="text-gray-600 dark:text-gray-400" />
					</button>
				</div>
			</div>

			{/* Files List */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
				{files.map((file) => (
					<div
						key={file.id}
						className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
					>
						<div className="flex items-center gap-3">
							<Files className="text-blue-500" size={24} />
							<div>
								<p className="font-medium text-gray-900 dark:text-white">{file.name}</p>
								<p className="text-sm text-gray-500 dark:text-gray-400">
									{file.size} • {file.date}
								</p>
							</div>
						</div>
						<span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
                            {file.type}
                        </span>
					</div>
				))}
			</div>
		</DashboardLayout>
	);
};

export default MyFiles;
