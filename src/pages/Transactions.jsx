import { Receipt, Download, Loader2, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import DashboardLayout from "../layout/DashboardLayout.jsx";
import transactionService from '../api/services/transactionService.js';
import Dropdown from '../components/ui/Dropdown.jsx';
import toast from 'react-hot-toast';

const Transactions = () => {
	const [transactions, setTransactions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filterStatus, setFilterStatus] = useState('ALL');
	const { getToken } = useAuth();

	// Filter options with counts
	const filterOptions = [
		{ value: 'ALL', label: 'All Transactions', count: transactions.length },
		{ value: 'SUCCESS', label: 'Completed', count: transactions.filter(t => t.status === 'SUCCESS').length },
		{ value: 'PENDING', label: 'Pending', count: transactions.filter(t => t.status === 'PENDING').length },
		{ value: 'FAILED', label: 'Failed', count: transactions.filter(t => t.status === 'FAILED').length },
	];

	useEffect(() => {
		fetchTransactions();
	}, [filterStatus]);

	const fetchTransactions = async () => {
		setLoading(true);
		try {
			const token = await getToken();
			let data;

			if (filterStatus === 'ALL') {
				data = await transactionService.getUserTransactions(token);
			} else {
				data = await transactionService.getTransactionsByStatus(filterStatus, token);
			}

			setTransactions(data);
		} catch (error) {
			console.error('Error fetching transactions:', error);
			toast.error('Failed to load transactions');
		} finally {
			setLoading(false);
		}
	};

	const handleDownloadReceipt = async (transactionId) => {
		try {
			const token = await getToken();
			await transactionService.downloadReceipt(transactionId, token);
			toast.success('Receipt downloaded successfully');
		} catch (error) {
			console.error('Error downloading receipt:', error);
			toast.error('Failed to download receipt');
		}
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-IN', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const getStatusColor = (status) => {
		switch (status) {
			case 'SUCCESS':
				return 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400';
			case 'PENDING':
				return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400';
			case 'FAILED':
			case 'ERROR':
				return 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400';
			default:
				return 'bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400';
		}
	};

	return (
		<DashboardLayout>
			{/* Header Section */}
			<div className="mb-6 sm:mb-8">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
							Transaction History
						</h1>
						<p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
							View your billing and payment history
						</p>
					</div>

					{/* Status Filter Dropdown */}
					<div className="w-full sm:w-auto sm:min-w-[220px]">
						<Dropdown
							options={filterOptions}
							value={filterStatus}
							onChange={setFilterStatus}
							placeholder="Filter by status"
							icon={Filter}
						/>
					</div>
				</div>
			</div>

			{/* Loading State */}
			{loading ? (
				<div className="flex items-center justify-center py-12">
					<Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
				</div>
			) : transactions.length === 0 ? (
				/* Empty State */
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 sm:p-12 text-center">
					<Receipt className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
					<h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
						No Transactions Found
					</h3>
					<p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
						{filterStatus !== 'ALL'
							? `You don't have any ${filterStatus.toLowerCase()} transactions.`
							: "You haven't made any transactions yet."}
					</p>
				</div>
			) : (
				<>
					{/* Desktop Table View */}
					<div className="hidden lg:block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
						<div className="overflow-x-auto">
							<table className="w-full">
								<thead className="bg-gray-50 dark:bg-gray-700">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Date</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Amount</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Credits</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
								</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
								{transactions.map((transaction) => (
									<tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
										<td className="px-6 py-4 text-sm text-gray-900 dark:text-white whitespace-nowrap">
											{formatDate(transaction.transactionDate)}
										</td>
										<td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
											{transaction.description}
										</td>
										<td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
											₹{transaction.amount}
										</td>
										<td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
											+{transaction.creditsAdded}
										</td>
										<td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                                    {transaction.status}
                                                </span>
										</td>
										<td className="px-6 py-4">
											<button
												onClick={() => handleDownloadReceipt(transaction.id)}
												className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
												title="Download Receipt"
											>
												<Download size={18} />
											</button>
										</td>
									</tr>
								))}
								</tbody>
							</table>
						</div>
					</div>

					{/* Mobile/Tablet Card View */}
					<div className="lg:hidden space-y-4">
						{transactions.map((transaction) => (
							<div
								key={transaction.id}
								className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-3"
							>
								<div className="flex items-start justify-between">
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-900 dark:text-white">
											{transaction.description}
										</p>
										<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
											{formatDate(transaction.transactionDate)}
										</p>
									</div>
									<span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                        {transaction.status}
                                    </span>
								</div>

								<div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
									<div className="flex items-center gap-4">
										<div>
											<p className="text-xs text-gray-500 dark:text-gray-400">Amount</p>
											<p className="text-sm font-semibold text-gray-900 dark:text-white">
												₹{transaction.amount}
											</p>
										</div>
										<div>
											<p className="text-xs text-gray-500 dark:text-gray-400">Credits</p>
											<p className="text-sm font-semibold text-green-600 dark:text-green-400">
												+{transaction.creditsAdded}
											</p>
										</div>
									</div>
									<button
										onClick={() => handleDownloadReceipt(transaction.id)}
										className="p-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all duration-200"
										title="Download Receipt"
									>
										<Download size={20} />
									</button>
								</div>
							</div>
						))}
					</div>
				</>
			)}
		</DashboardLayout>
	);
};

export default Transactions;
