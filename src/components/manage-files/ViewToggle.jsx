import { Grid, List } from 'lucide-react';

const ViewToggle = ({ viewMode, setViewMode }) => {
	return (
		<div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
			<button
				onClick={() => setViewMode('list')}
				className={`p-2 transition-colors ${
					viewMode === 'list'
						? 'bg-blue-500 text-white'
						: 'bg-transparent text-gray-600 cursor-pointer dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
				}`}
				aria-label="List view"
			>
				<List size={20} />
			</button>
			<button
				onClick={() => setViewMode('grid')}
				className={`p-2 transition-colors ${
					viewMode === 'grid'
						? 'bg-blue-500 text-white'
						: 'bg-transparent text-gray-600 cursor-pointer dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
				}`}
				aria-label="Grid view"
			>
				<Grid size={20} />
			</button>
		</div>
	);
};

export default ViewToggle;
