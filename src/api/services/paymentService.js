import apiClient from '../client';

/**
 * Payment Service - Handles all payment-related API calls
 */
const paymentService = {
	/**
	 * Create a Razorpay order
	 * @param {Object} orderData - Order details { planId, amount, credits, currency }
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Order response with orderId, amount, currency, etc.
	 */
	createOrder: async (orderData, token) => {
		const response = await apiClient.post('/payments/create-order', orderData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Verify payment after successful Razorpay transaction
	 * @param {Object} verificationData - { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId }
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Verification response { success: boolean, message: string }
	 */
	verifyPayment: async (verificationData, token) => {
		const response = await apiClient.post('/payments/payment-verify', verificationData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},

	/**
	 * Get payment history
	 * @param {string} token - Clerk auth token
	 * @returns {Promise} Array of payment transactions
	 */
	getPaymentHistory: async (token) => {
		const response = await apiClient.get('/payments/payment/history', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		return response.data;
	},
};

export default paymentService;
