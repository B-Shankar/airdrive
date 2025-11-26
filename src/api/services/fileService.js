import apiClient from '../client';

/**
 * File Service - Handles all file-related API calls
 */
const fileService = {
	/**
	 * Get all files for the authenticated user
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Array of file objects
	 */
	getMyFiles: async (token) => {
		const response = await apiClient.get('/files/my', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Download a file by ID (works with or without auth)
	 * @param {string} fileId - File ID to download
	 * @param {string} fileName - File name for saving
	 * @param {string} token - Clerk auth token (optional)
	 * @returns {Promise} Downloads the file
	 */
	downloadFile: async (fileId, fileName, token = null) => {
		try {
			const config = {
				responseType: 'blob',
			};

			if (token) {
				config.headers = {
					Authorization: `Bearer ${token}`,
				};
			}

			const response = await apiClient.get(`/files/download/${fileId}`, config);

			// Create blob link to download
			const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement('a');
			link.href = url;
			link.setAttribute('download', fileName);
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.URL.revokeObjectURL(url);

			return response.data;
		} catch (error) {
			console.error('Download error:', error);
			throw error;
		}
	},

	/**
	 * Delete a file by ID
	 * @param {string} fileId - File ID to delete
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Deletion response
	 */
	deleteFile: async (fileId, token) => {
		const response = await apiClient.delete(`/files/${fileId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Toggle file public/private status
	 * @param {string} fileId - File ID
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Updated file object
	 */
	toggleFilePublic: async (fileId, token) => {
		const response = await apiClient.post(
			`/files/${fileId}/toggle-public`,
			{}, // Empty body as the endpoint toggles the state
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
					"Accept": "application/json, text/plain, */*",
				},
			}
		);
		return response.data;
	},

	/**
	 * Upload multiple files
	 * @param {File[]} files - Array of files to upload
	 * @param {string} token - Clerk auth token
	 * @param {Function} onUploadProgress - Progress callback
	 * @returns {Promise} Upload response
	 */
	uploadFiles: async (files, token, onUploadProgress = null) => {
		const formData = new FormData();

		// Append all files with the same field name 'files'
		files.forEach((file) => {
			formData.append('files', file);
		});

		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data',
			},
		};

		if (onUploadProgress) {
			config.onUploadProgress = onUploadProgress;
		}

		const response = await apiClient.post('/files/upload', formData, config);
		return response.data;
	},

	/**
	 * Get file details by ID
	 * @param {string} fileId - File ID
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} File object
	 */
	getFileById: async (fileId, token) => {
		const response = await apiClient.get(`/files/${fileId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Get share link for a public file
	 * @param {string} fileId - File ID
	 * @returns {string} Share URL
	 */
	getShareLink: (fileId) => {
		return `${window.location.origin}/file/${fileId}`;
	},

	/**
	 * Get public file metadata (no auth required)
	 * @param {string} fileId - File ID
	 * @returns {Promise} File metadata
	 */
	getPublicFile: async (fileId) => {
		const response = await apiClient.get(`/files/public/${fileId}`);
		return response.data;
	},

	/**
	 * Get download URL for file
	 * @param {string} fileId - File ID
	 * @returns {string} Download URL
	 */
	getDownloadUrl: (fileId) => {
		const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1.0';
		return `${baseUrl}/files/download/${fileId}`;
	},
};

export default fileService;
