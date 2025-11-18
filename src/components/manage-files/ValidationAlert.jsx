import { AlertCircle } from 'lucide-react';

const ValidationAlert = ({ type = 'error', message }) => {
	return (
		<div
			className={`flex items-start gap-3 p-4 rounded-lg border ${
				type === 'warning'
					? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
					: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
			}`}
		>
			<AlertCircle
				size={20}
				className={`flex-shrink-0 mt-0.5 ${
					type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
				}`}
			/>
			<p
				className={`text-sm font-medium ${
					type === 'warning' ? 'text-yellow-800 dark:text-yellow-300' : 'text-red-800 dark:text-red-300'
				}`}
			>
				{message}
			</p>
		</div>
	);
};

export default ValidationAlert;
