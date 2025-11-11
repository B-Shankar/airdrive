import { Receipt, Download } from 'lucide-react';
import DashboardLayout from "../layout/DashboardLayout.jsx";

const Transactions = () => {
	const transactions = [
		{ id: 1, date: '2025-11-05', description: 'Pro Plan - Monthly', amount: '$9.99', status: 'Completed' },
		{ id: 2, date: '2025-10-05', description: 'Pro Plan - Monthly', amount: '$9.99', status: 'Completed' },
		{ id: 3, date: '2025-09-05', description: 'Pro Plan - Monthly', amount: '$9.99', status: 'Completed' },
	];

	return (
		<DashboardLayout>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Transaction History
				</h1>
				<p className="mt-2 text-gray-600 dark:text-gray-400">
					View your billing and payment history
				</p>
			</div>

			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
				<table className="w-full">
					<thead className="bg-gray-50 dark:bg-gray-700">
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
					</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
					{transactions.map((transaction) => (
						<tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
							<td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{transaction.date}</td>
							<td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{transaction.description}</td>
							<td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{transaction.amount}</td>
							<td className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
                                        {transaction.status}
                                    </span>
							</td>
							<td className="px-6 py-4">
								<button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
									<Download size={18} />
								</button>
							</td>
						</tr>
					))}
					</tbody>
				</table>
			</div>
		</DashboardLayout>
	);
};

export default Transactions;
