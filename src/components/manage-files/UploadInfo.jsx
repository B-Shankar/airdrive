import { AlertCircle } from 'lucide-react';

const UploadInfo = ({ maxFiles, credits }) => {
	return (
		<div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
			<div className="flex items-start gap-3">
				<AlertCircle size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
				<div className="text-sm text-blue-800 dark:text-blue-300">
					<p className="font-semibold mb-2">Upload Requirements:</p>
					<ul className="space-y-1">
						<li>
							• Maximum <strong>{maxFiles} files</strong> per upload
						</li>
						<li>
							• Maximum <strong>5MB</strong> per file
						</li>
						<li>
							• Maximum <strong>25MB</strong> total size
						</li>
						<li>
							• <strong>1 credit</strong> per file (You have <strong>{credits} credits</strong>)
						</li>
						<li>• All file types supported</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default UploadInfo;
