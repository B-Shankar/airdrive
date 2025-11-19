const UploadProgress = ({ progress, fileCount }) => {
	return (
		<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
					<span className="text-sm font-semibold text-gray-900 dark:text-white">
            Uploading {fileCount} file(s)...
          </span>
				</div>
				<span className="text-sm font-bold text-blue-600 dark:text-blue-400">{progress}%</span>
			</div>
			<div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
				<div
					className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-300 ease-out"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
};

export default UploadProgress;
