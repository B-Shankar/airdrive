import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1.0';

// Create axios instance with default config
const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 30000,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor - Add auth token to every request
apiClient.interceptors.request.use(
	(config) => {
		// Token will be added per-request basis since we're using Clerk
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		// Handle common errors
		if (error.response) {
			switch (error.response.status) {
				case 401:
					console.error('Unauthorized - Please login again');
					break;
				case 403:
					console.error('Forbidden - You do not have permission');
					break;
				case 404:
					console.error('Resource not found');
					break;
				case 500:
					console.error('Server error - Please try again later');
					break;
				default:
					console.error('An error occurred');
			}
		} else if (error.request) {
			console.error('No response from server');
		} else {
			console.error('Request error:', error.message);
		}

		return Promise.reject(error);
	}
);

export default apiClient;
