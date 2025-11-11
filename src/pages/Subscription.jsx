import { Check, CreditCard } from 'lucide-react';
import DashboardLayout from "../layout/DashboardLayout.jsx";

const Subscription = () => {
	const plans = [
		{
			name: 'Free',
			price: '0',
			features: ['10 GB Storage', '5 File Uploads/day', 'Basic Support'],
			current: true,
		},
		{
			name: 'Pro',
			price: '9.99',
			features: ['100 GB Storage', 'Unlimited Uploads', 'Priority Support', 'Advanced Analytics'],
			current: false,
		},
		{
			name: 'Enterprise',
			price: '29.99',
			features: ['Unlimited Storage', 'Unlimited Uploads', '24/7 Support', 'Custom Branding', 'API Access'],
			current: false,
		},
	];

	return (
		<DashboardLayout>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
					Subscription Plans
				</h1>
				<p className="mt-2 text-gray-600 dark:text-gray-400">
					Upgrade your plan to unlock more features
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{plans.map((plan) => (
					<div
						key={plan.name}
						className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${
							plan.current ? 'ring-2 ring-blue-500' : ''
						}`}
					>
						{plan.current && (
							<span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 mb-4">
                                Current Plan
                            </span>
						)}
						<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
							{plan.name}
						</h3>
						<p className="text-4xl font-bold text-blue-500 mb-6">
							${plan.price}
							<span className="text-base font-normal text-gray-500 dark:text-gray-400">/month</span>
						</p>
						<ul className="space-y-3 mb-6">
							{plan.features.map((feature, index) => (
								<li key={index} className="flex items-center gap-2">
									<Check className="text-green-500" size={20} />
									<span className="text-gray-700 dark:text-gray-300">{feature}</span>
								</li>
							))}
						</ul>
						<button
							className={`w-full py-3 rounded-lg font-medium transition-colors duration-200 ${
								plan.current
									? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
									: 'bg-blue-500 hover:bg-blue-600 text-white'
							}`}
							disabled={plan.current}
						>
							{plan.current ? 'Current Plan' : 'Upgrade'}
						</button>
					</div>
				))}
			</div>
		</DashboardLayout>
	);
};

export default Subscription;
