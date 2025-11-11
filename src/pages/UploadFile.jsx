import { Upload as UploadIcon, File, X } from 'lucide-react';
import { useState } from 'react';
import DashboardLayout from "../layout/DashboardLayout.jsx";

const UploadFile = () => {
	const [files, setFiles] = useState([]);

	const handleFileChange = (e) => {
		const selectedFiles = Array.from(e.target.files);
		setFiles(prev => [...prev, ...selectedFiles]);
	};

	const removeFile = (index) => {
		setFiles(prev => prev.filter((_, i) => i !== index));
	};

	return (
		<DashboardLayout>
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
					Upload Files
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mb-8">
					Upload and share your files securely
				</p>

				{/* Upload Area */}
				<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
					<label className="block cursor-pointer">
						<div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 dark:hover:border-blue-400 transition-colors duration-200">
							<UploadIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
							<p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
								Click to upload or drag and drop
							</p>
							<p className="text-sm text-gray-500 dark:text-gray-400">
								PNG, JPG, PDF, DOC up to 10GB
							</p>
						</div>
						<input
							type="file"
							multiple
							className="hidden"
							onChange={handleFileChange}
						/>
					</label>

					{/* File List */}
					{files.length > 0 && (
						<div className="mt-6 space-y-3">
							<h3 className="font-semibold text-gray-900 dark:text-white">
								Selected Files ({files.length})
							</h3>
							{files.map((file, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
								>
									<div className="flex items-center gap-3">
										<File className="text-blue-500" size={20} />
										<span className="text-sm text-gray-900 dark:text-white">
                                            {file.name}
                                        </span>
									</div>
									<button
										onClick={() => removeFile(index)}
										className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
									>
										<X size={16} className="text-gray-500 dark:text-gray-400" />
									</button>
								</div>
							))}
							<button className="w-full mt-4 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
								Upload {files.length} {files.length === 1 ? 'File' : 'Files'}
							</button>
						</div>
					)}
				</div>
			</div>
		</DashboardLayout>
	);
};

export default UploadFile;
