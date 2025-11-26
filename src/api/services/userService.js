import apiClient from '../client';

/**
 * User Service - Handles all user-related API calls
 */
const userService = {
	/**
	 * Get user credits and plan information
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} User credits object { credits: number, plan: string }
	 */
	getUserCredits: async (token) => {
		const response = await apiClient.get('/users/credits', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Get user profile information
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} User profile object
	 */
	getUserProfile: async (token) => {
		const response = await apiClient.get('/users/profile', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},
};

export default userService;
