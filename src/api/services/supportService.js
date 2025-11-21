import apiClient from '../client';

/**
 * Support Service - Handles support ticket operations
 */
const supportService = {
	/**
	 * Create a support ticket
	 * @param {Object} ticketData - { category, subject, message, orderId?, paymentId?, attemptedAmount? }
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Ticket response with ticketId
	 */
	createTicket: async (ticketData, token) => {
		const response = await apiClient.post('/support/create-ticket', ticketData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Get user's support tickets
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Array of tickets
	 */
	getUserTickets: async (token) => {
		const response = await apiClient.get('/support/my-tickets', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Get specific ticket by ID
	 * @param {string} ticketId - Ticket ID
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Ticket details
	 */
	getTicketById: async (ticketId, token) => {
		const response = await apiClient.get(`/support/ticket/${ticketId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},
};

export default supportService;
