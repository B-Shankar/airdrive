import {X, Coins, TrendingUp, Plus, History, Zap, Wallet} from 'lucide-react';
import { useState } from 'react';

const CreditsModal = ({ isOpen, onClose, credits }) => {
	const [activeTab, setActiveTab] = useState('overview');

	// Mock data - replace with actual data from your backend
	const recentTransactions = [
		{ id: 1, type: 'earned', amount: 50, description: 'Daily login bonus', date: '2 hours ago' },
		{ id: 2, type: 'spent', amount: -20, description: 'File upload (5GB)', date: '1 day ago' },
		{ id: 3, type: 'earned', amount: 100, description: 'Referral bonus', date: '3 days ago' },
		{ id: 4, type: 'spent', amount: -30, description: 'Premium features', date: '5 days ago' },
	];

	const creditPackages = [
		{ id: 1, credits: 100, price: 9.99, bonus: 0, popular: false },
		{ id: 2, credits: 500, price: 39.99, bonus: 50, popular: true },
		{ id: 3, credits: 1000, price: 69.99, bonus: 150, popular: false },
	];

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div
					className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="relative bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6">
						<button
							onClick={onClose}
							className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
						>
							<X size={20} className="text-white" />
						</button>

						<div className="flex items-center gap-4 mb-6">
							<div className="p-3 bg-white/20 rounded-xl">
								<Wallet size={32} className="text-yellow-300" />
							</div>
							<div>
								<h2 className="text-3xl font-bold text-white">Your Credits</h2>
								<p className="text-blue-100">Manage your AirDrive credits</p>
							</div>
						</div>

						{/* Current Balance Card */}
						<div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-blue-100 text-sm mb-1">Available Balance</p>
									<p className="text-5xl font-bold text-white">{credits}</p>
								</div>
								<div className="text-right">
									<div className="flex items-center gap-2 text-green-300 mb-2">
										<TrendingUp size={18} />
										<span className="text-sm font-semibold">+15% this month</span>
									</div>
									<p className="text-blue-100 text-sm">≈ ${(credits * 0.1).toFixed(2)} USD</p>
								</div>
							</div>
						</div>
					</div>

					{/* Tabs */}
					<div className="border-b border-gray-200 dark:border-gray-700 px-6">
						<div className="flex gap-6">
							<button
								onClick={() => setActiveTab('overview')}
								className={`py-4 px-2 border-b-2 font-medium transition-colors duration-200 ${
									activeTab === 'overview'
										? 'border-blue-500 text-blue-600 dark:text-blue-400'
										: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
								}`}
							>
								Overview
							</button>
							<button
								onClick={() => setActiveTab('buy')}
								className={`py-4 px-2 border-b-2 font-medium transition-colors duration-200 ${
									activeTab === 'buy'
										? 'border-blue-500 text-blue-600 dark:text-blue-400'
										: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
								}`}
							>
								Buy Credits
							</button>
							<button
								onClick={() => setActiveTab('history')}
								className={`py-4 px-2 border-b-2 font-medium transition-colors duration-200 ${
									activeTab === 'history'
										? 'border-blue-500 text-blue-600 dark:text-blue-400'
										: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
								}`}
							>
								History
							</button>
						</div>
					</div>

					{/* Content */}
					<div className="p-6 overflow-y-auto max-h-[50vh]">
						{/* Overview Tab */}
						{activeTab === 'overview' && (
							<div className="space-y-6">
								{/* Quick Stats */}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
										<div className="flex items-center gap-2 mb-2">
											<Plus className="text-green-600 dark:text-green-400" size={18} />
											<span className="text-sm text-gray-600 dark:text-gray-400">Earned</span>
										</div>
										<p className="text-2xl font-bold text-green-600 dark:text-green-400">+150</p>
										<p className="text-xs text-gray-500 dark:text-gray-500 mt-1">This month</p>
									</div>

									<div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
										<div className="flex items-center gap-2 mb-2">
											<History className="text-red-600 dark:text-red-400" size={18} />
											<span className="text-sm text-gray-600 dark:text-gray-400">Spent</span>
										</div>
										<p className="text-2xl font-bold text-red-600 dark:text-red-400">-50</p>
										<p className="text-xs text-gray-500 dark:text-gray-500 mt-1">This month</p>
									</div>

									<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
										<div className="flex items-center gap-2 mb-2">
											<Zap className="text-blue-600 dark:text-blue-400" size={18} />
											<span className="text-sm text-gray-600 dark:text-gray-400">Streak</span>
										</div>
										<p className="text-2xl font-bold text-blue-600 dark:text-blue-400">7 days</p>
										<p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Daily bonus</p>
									</div>
								</div>

								{/* How to Earn Credits */}
								<div>
									<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
										How to Earn Credits
									</h3>
									<div className="space-y-3">
										<div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
												<span className="text-blue-600 dark:text-blue-400 font-bold">+10</span>
											</div>
											<div>
												<p className="font-medium text-gray-900 dark:text-white">Daily Login</p>
												<p className="text-sm text-gray-500 dark:text-gray-400">Login every day to earn credits</p>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
												<span className="text-green-600 dark:text-green-400 font-bold">+100</span>
											</div>
											<div>
												<p className="font-medium text-gray-900 dark:text-white">Refer a Friend</p>
												<p className="text-sm text-gray-500 dark:text-gray-400">Get credits when friends join</p>
											</div>
										</div>
										<div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
											<div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
												<span className="text-purple-600 dark:text-purple-400 font-bold">+50</span>
											</div>
											<div>
												<p className="font-medium text-gray-900 dark:text-white">Complete Profile</p>
												<p className="text-sm text-gray-500 dark:text-gray-400">Fill out your profile information</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Buy Credits Tab */}
						{activeTab === 'buy' && (
							<div className="space-y-6">
								<div className="text-center mb-6">
									<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
										Choose Your Package
									</h3>
									<p className="text-gray-600 dark:text-gray-400">
										Select a credits package that fits your needs
									</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
									{creditPackages.map((pkg) => (
										<div
											key={pkg.id}
											className={`relative rounded-xl p-6 border-2 transition-all duration-200 cursor-pointer hover:scale-105 ${
												pkg.popular
													? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
													: 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600'
											}`}
										>
											{pkg.popular && (
												<div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                        POPULAR
                                                    </span>
												</div>
											)}

											<div className="text-center">
												<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-4">
													<Coins className="text-yellow-300" size={32} />
												</div>
												<h4 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
													{pkg.credits}
												</h4>
												<p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Credits</p>

												{pkg.bonus > 0 && (
													<div className="mb-4">
                                                        <span className="inline-block bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-semibold px-3 py-1 rounded-full">
                                                            +{pkg.bonus} BONUS
                                                        </span>
													</div>
												)}

												<p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
													${pkg.price}
												</p>

												<button className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
													pkg.popular
														? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
														: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
												}`}>
													Purchase
												</button>
											</div>
										</div>
									))}
								</div>

								<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
									<p className="text-sm text-gray-700 dark:text-gray-300 text-center">
										💡 <strong>Tip:</strong> Larger packages give you bonus credits for better value!
									</p>
								</div>
							</div>
						)}

						{/* History Tab */}
						{activeTab === 'history' && (
							<div>
								<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
									Recent Transactions
								</h3>
								<div className="space-y-3">
									{recentTransactions.map((transaction) => (
										<div
											key={transaction.id}
											className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
										>
											<div className="flex items-center gap-3">
												<div className={`w-10 h-10 rounded-full flex items-center justify-center ${
													transaction.type === 'earned'
														? 'bg-green-100 dark:bg-green-900'
														: 'bg-red-100 dark:bg-red-900'
												}`}>
													{transaction.type === 'earned' ? (
														<Plus className="text-green-600 dark:text-green-400" size={18} />
													) : (
														<History className="text-red-600 dark:text-red-400" size={18} />
													)}
												</div>
												<div>
													<p className="font-medium text-gray-900 dark:text-white">
														{transaction.description}
													</p>
													<p className="text-sm text-gray-500 dark:text-gray-400">
														{transaction.date}
													</p>
												</div>
											</div>
											<span className={`font-bold text-lg ${
												transaction.type === 'earned'
													? 'text-green-600 dark:text-green-400'
													: 'text-red-600 dark:text-red-400'
											}`}>
                                                {transaction.amount > 0 ? '+' : ''}{transaction.amount}
                                            </span>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default CreditsModal;
