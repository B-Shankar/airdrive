import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import UploadModal from "../components/manage-files/UploadModal.jsx";

const UploadFile = () => {
	const navigate = useNavigate();

	const handleUploadSuccess = () => {
		navigate('/my-files');
	};

	const handleCancel = () => {
		navigate('/my-files');
	};

	return (
		<DashboardLayout>
			{/* Header - Responsive */}
			<div className="mb-6 md:mb-8">
				<h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
					Upload Files
				</h1>
				<p className="mt-1 md:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
					Upload and share your files securely
				</p>
			</div>

			{/* Upload Content - Responsive */}
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
				<UploadModal
					isOpen={true}
					onClose={handleCancel}
					onUploadSuccess={handleUploadSuccess}
					isPage={true}
				/>
			</div>
		</DashboardLayout>
	);
};

export default UploadFile;
