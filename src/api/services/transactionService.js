import apiClient from '../client';

/**
 * Transaction Service - Handles transaction history operations
 */
const transactionService = {
	/**
	 * Get all user transactions
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Array of transactions
	 */
	getUserTransactions: async (token) => {
		const response = await apiClient.get('/transactions', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Get transactions by status
	 * @param {string} status - Transaction status (SUCCESS, PENDING, FAILED, ERROR)
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Array of filtered transactions
	 */
	getTransactionsByStatus: async (status, token) => {
		const response = await apiClient.get(`/transactions/status/${status}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Get transaction by ID
	 * @param {string} transactionId - Transaction ID
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Transaction details
	 */
	getTransactionById: async (transactionId, token) => {
		const response = await apiClient.get(`/transactions/${transactionId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Download transaction receipt
	 * @param {string} transactionId - Transaction ID
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Receipt data
	 */
	downloadReceipt: async (transactionId, token) => {
		const response = await apiClient.get(`/transactions/${transactionId}/receipt`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			responseType: 'blob', // For file download
		});
		return response.data;
	},
};

export default transactionService;
