import { X, AlertCircle, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import supportService from '../../api/services/supportService.js';
import toast from 'react-hot-toast';

const SupportModal = ({ isOpen, onClose, paymentError = null }) => {
	const [category, setCategory] = useState(paymentError ? 'PAYMENT_FAILED' : 'GENERAL_QUERY');
	const [subject, setSubject] = useState('');
	const [message, setMessage] = useState('');
	const [submitting, setSubmitting] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const [ticketId, setTicketId] = useState('');
	const { getToken } = useAuth();

	const categories = [
		{ value: 'PAYMENT_FAILED', label: 'Payment Failed', icon: AlertCircle },
		{ value: 'REFUND_REQUEST', label: 'Refund Request', icon: AlertCircle },
		{ value: 'TECHNICAL_ISSUE', label: 'Technical Issue', icon: MessageCircle },
		{ value: 'GENERAL_QUERY', label: 'General Query', icon: MessageCircle },
	];

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!subject.trim() || !message.trim()) {
			toast.error('Please fill in all fields');
			return;
		}

		setSubmitting(true);

		try {
			const token = await getToken();

			const ticketData = {
				category,
				subject: subject.trim(),
				message: message.trim(),
				...(paymentError && {
					orderId: paymentError.orderId,
					paymentId: paymentError.paymentId,
					attemptedAmount: paymentError.amount,
				}),
			};

			const response = await supportService.createTicket(ticketData, token);

			if (response.success) {
				setTicketId(response.ticketId);
				setSubmitted(true);
				toast.success('Support ticket created successfully!');
			} else {
				toast.error(response.responseMessage || 'Failed to create ticket');
			}
		} catch (error) {
			console.error('Error creating support ticket:', error);
			toast.error('Failed to create support ticket');
		} finally {
			setSubmitting(false);
		}
	};

	const handleClose = () => {
		setSubject('');
		setMessage('');
		setSubmitted(false);
		setTicketId('');
		onClose();
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Backdrop */}
			<div
				className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300"
				onClick={handleClose}
			/>

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
				<div
					className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className="relative bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 p-6">
						<button
							onClick={handleClose}
							className="absolute top-4 right-4 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors duration-200"
						>
							<X size={20} className="text-white" />
						</button>

						<div className="flex items-center gap-3">
							<MessageCircle className="text-white" size={32} />
							<div>
								<h2 className="text-2xl font-bold text-white">Contact Support</h2>
								<p className="text-blue-100">We're here to help you</p>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
						{!submitted ? (
							<form onSubmit={handleSubmit} className="space-y-6">
								{/* Category Selection */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
										Issue Category
									</label>
									<div className="grid grid-cols-2 gap-3">
										{categories.map((cat) => {
											const Icon = cat.icon;
											return (
												<button
													key={cat.value}
													type="button"
													onClick={() => setCategory(cat.value)}
													className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
														category === cat.value
															? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
															: 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-700 dark:text-gray-300'
													}`}
												>
													<Icon size={18} />
													<span className="text-sm font-medium">{cat.label}</span>
												</button>
											);
										})}
									</div>
								</div>

								{/* Subject */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Subject
									</label>
									<input
										type="text"
										value={subject}
										onChange={(e) => setSubject(e.target.value)}
										placeholder="Brief description of your issue"
										className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
										maxLength={200}
										required
									/>
									<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
										{subject.length}/200 characters
									</p>
								</div>

								{/* Message */}
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
										Message
									</label>
									<textarea
										value={message}
										onChange={(e) => setMessage(e.target.value)}
										placeholder="Please describe your issue in detail..."
										rows={6}
										className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
										maxLength={2000}
										required
									/>
									<p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
										{message.length}/2000 characters
									</p>
								</div>

								{/* Payment Error Info */}
								{paymentError && (
									<div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
										<p className="text-sm text-red-700 dark:text-red-400 font-medium mb-2">
											Payment Failed - We'll help resolve this
										</p>
										<div className="text-xs text-red-600 dark:text-red-400 space-y-1">
											{paymentError.orderId && <p>Order ID: {paymentError.orderId}</p>}
											{paymentError.amount && <p>Amount: ₹{paymentError.amount}</p>}
										</div>
									</div>
								)}

								{/* Submit Button */}
								<button
									type="submit"
									disabled={submitting}
									className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									{submitting ? (
										<>
											<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
											Submitting...
										</>
									) : (
										<>
											<Send size={18} />
											Submit Ticket
										</>
									)}
								</button>
							</form>
						) : (
							<div className="text-center py-8">
								<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
									<CheckCircle className="text-green-500" size={32} />
								</div>
								<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
									Ticket Created Successfully!
								</h3>
								<p className="text-gray-600 dark:text-gray-400 mb-4">
									Your ticket ID is: <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{ticketId}</span>
								</p>
								<p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
									We'll respond to your query within 24 hours via email.
								</p>
								<button
									onClick={handleClose}
									className="px-6 py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200"
								>
									Close
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default SupportModal;
