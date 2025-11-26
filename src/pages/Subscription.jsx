import { Check, Coins, Loader2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import DashboardLayout from "../layout/DashboardLayout.jsx";
import paymentService from "../api/services/paymentService.js";
import { useUserCredits } from '../hooks/useUserCredits.js';
import SupportModal from '../components/support/SupportModal.jsx';
import toast from 'react-hot-toast';

const Subscription = () => {
	const [processingPayment, setProcessingPayment] = useState(false);
	const [message, setMessage] = useState("");
	const [messageType, setMessageType] = useState("");
	const [razorpayLoaded, setRazorpayLoaded] = useState(false);
	const [showSupportModal, setShowSupportModal] = useState(false);
	const [paymentError, setPaymentError] = useState(null);
	const [technicalError, setTechnicalError] = useState(false);
	const razorpayScriptRef = useRef(null);
	const { getToken } = useAuth();
	const { credits, fetchUserCredits, loading: creditsLoading } = useUserCredits();

	const plans = [
		{
			id: "premium",
			name: "Premium",
			credits: 500,
			price: 500,
			features: [
				"Upload up to 500 files",
				"Access to all basic features",
				"Priority support"
			],
			recommended: false
		},
		{
			id: "ultimate",
			name: "Ultimate",
			credits: 5000,
			price: 2500,
			features: [
				"Upload up to 5000 files",
				"Access to all premium features",
				"Priority support",
				"Advanced analytics"
			],
			recommended: true
		}
	];

	// Load Razorpay Script
	useEffect(() => {
		if (!window.Razorpay) {
			const script = document.createElement('script');
			script.src = 'https://checkout.razorpay.com/v1/checkout.js';
			script.async = true;
			script.onload = () => {
				console.log('Razorpay script loaded successfully');
				setRazorpayLoaded(true);
			};
			script.onerror = () => {
				console.error('Failed to load Razorpay script');
				setMessage('Payment gateway failed to load. Please refresh the page and try again.');
				setMessageType('error');
				setTechnicalError(true);
				toast.error('Failed to load payment gateway');
			};
			document.body.appendChild(script);
			razorpayScriptRef.current = script;
		} else {
			setRazorpayLoaded(true);
		}

		return () => {
			if (razorpayScriptRef.current && document.body.contains(razorpayScriptRef.current)) {
				document.body.removeChild(razorpayScriptRef.current);
			}
		};
	}, []);

	const handlePurchase = async (plan) => {
		if (!razorpayLoaded) {
			toast.error('Payment gateway is loading. Please wait...');
			return;
		}

		setProcessingPayment(true);
		setMessage("");
		setMessageType("");
		setTechnicalError(false);
		setPaymentError(null);

		try {
			const token = await getToken();

			if (!token) {
				throw new Error('Authentication failed. Please login again.');
			}

			// Create order using paymentService
			const orderData = {
				planId: plan.id,
				amount: plan.price,
				currency: 'INR',
				credits: plan.credits
			};

			console.log('Creating order with data:', orderData);
			const orderResponse = await paymentService.createOrder(orderData, token);
			console.log('Order response:', orderResponse);

			if (!orderResponse.success) {
				throw new Error(orderResponse.message || 'Failed to create order');
			}

			// Validate required fields from backend
			if (!orderResponse.orderId) {
				throw new Error('Invalid order response from server');
			}

			// Initialize Razorpay with comprehensive error handling
			const options = {
				key: import.meta.env.VITE_RAZORPAY_KEY_ID,
				amount: orderResponse.amount,
				currency: orderResponse.currency,
				name: 'AirDrive',
				description: `${plan.name} Plan - ${plan.credits} Credits`,
				order_id: orderResponse.orderId,
				handler: async (response) => {
					console.log('Razorpay payment success response:', response);
					await handlePaymentSuccess(response, plan, token);
				},
				prefill: {
					name: orderResponse.customerName || '',
					email: orderResponse.customerEmail || '',
					contact: orderResponse.customerPhone || ''
				},
				theme: {
					color: '#3B82F6'
				},
				modal: {
					ondismiss: () => {
						console.log('Razorpay modal dismissed by user');
						setProcessingPayment(false);
						setMessage('Payment cancelled by user');
						setMessageType('error');
						toast.error('Payment cancelled');
					},
					//  Handle Razorpay modal errors
					escape: true,
					backdropclose: false
				}
			};

			try {
				const razorpay = new window.Razorpay(options);

				//  Critical: Handle payment.failed event from Razorpay
				razorpay.on('payment.failed', function (response) {
					console.error('Razorpay payment.failed event:', response.error);
					handlePaymentFailure(response.error, plan, orderResponse.orderId);
				});

				//  Open Razorpay modal with error handling
				razorpay.open();

			} catch (razorpayError) {
				//  Catch any errors during Razorpay initialization
				console.error('Error initializing Razorpay:', razorpayError);
				throw new Error('Failed to initialize payment gateway. Please try again.');
			}

		} catch (error) {
			console.error("Error in payment flow:", error);
			handleOrderCreationError(error, plan);
		}
	};

	const handleOrderCreationError = (error, plan) => {
		let errorMessage = "We're experiencing technical difficulties. Please try again or contact support.";

		if (error.response) {
			// API error response
			if (error.response.status === 401) {
				errorMessage = "Your session has expired. Please login again.";
			} else if (error.response.status === 500) {
				errorMessage = "Server error. Our team has been notified. Please try again later.";
			} else if (error.response.status === 400) {
				errorMessage = error.response.data?.message || "Invalid request. Please check your details.";
			} else {
				errorMessage = error.response.data?.message || errorMessage;
			}
		} else if (error.message) {
			errorMessage = error.message;
		}

		setMessage(errorMessage);
		setMessageType("error");
		setTechnicalError(true);
		toast.error(errorMessage);
		setProcessingPayment(false);

		//  Set payment error for support modal (order creation stage)
		setPaymentError({
			orderId: null,
			paymentId: null,
			amount: plan.price,
			planId: plan.id,
			planName: plan.name,
			stage: 'order_creation',
			errorMessage: errorMessage
		});
	};

	const handlePaymentFailure = (error, plan, orderId) => {
		console.error('Razorpay payment failed:', error);

		//  Extract detailed error information from Razorpay
		const errorCode = error.code || 'UNKNOWN_ERROR';
		const errorDescription = error.description || 'Payment failed. Please try again.';
		const errorReason = error.reason || 'Unknown reason';
		const errorStep = error.step || 'payment';
		const errorSource = error.source || 'customer';
		const paymentId = error.metadata?.payment_id || null;

		//  Create user-friendly error message
		let userMessage = errorDescription;

		// Map common Razorpay error codes to friendly messages
		const errorMessages = {
			'BAD_REQUEST_ERROR': 'Invalid payment request. Please try again.',
			'GATEWAY_ERROR': 'Payment gateway error. Please try again or use a different payment method.',
			'SERVER_ERROR': 'Payment server error. Please try again after some time.',
			'PAYMENT_CANCELLED': 'Payment was cancelled. You can try again.',
			'PAYMENT_FAILED': errorDescription || 'Payment failed. Please check your payment method and try again.',
		};

		if (errorMessages[errorCode]) {
			userMessage = errorMessages[errorCode];
		}

		setMessage(userMessage);
		setMessageType("error");
		setTechnicalError(true);

		//  Store comprehensive error details for support
		setPaymentError({
			orderId: orderId,
			paymentId: paymentId,
			amount: plan.price,
			errorCode: errorCode,
			errorDescription: errorDescription,
			errorReason: errorReason,
			errorStep: errorStep,
			errorSource: errorSource,
			planId: plan.id,
			planName: plan.name,
			stage: 'payment',
			timestamp: new Date().toISOString()
		});

		toast.error(userMessage);
		setProcessingPayment(false);
	};

	const handlePaymentSuccess = async (razorpayResponse, plan, token) => {
		try {
			// Match the backend DTO field names exactly
			const verificationData = {
				razorpay_order_id: razorpayResponse.razorpay_order_id,
				razorpay_payment_id: razorpayResponse.razorpay_payment_id,
				razorpay_signature: razorpayResponse.razorpay_signature,
				planId: plan.id
			};

			console.log('Verifying payment with data:', verificationData);
			const verifyResponse = await paymentService.verifyPayment(verificationData, token);
			console.log('Verification response:', verifyResponse);

			if (verifyResponse.success) {
				setMessage(`Payment successful! ${plan.credits} credits have been added to your account.`);
				setMessageType("success");
				toast.success(`${plan.credits} credits added successfully!`, { duration: 5000 });

				// Refresh user credits
				await fetchUserCredits();

				// Clear any previous errors
				setTechnicalError(false);
				setPaymentError(null);
			} else {
				throw new Error(verifyResponse.message || 'Payment verification failed');
			}
		} catch (error) {
			console.error("Error verifying payment:", error);

			let errorMessage = "Payment verification failed. Your payment may have succeeded but credits weren't added. Please contact support with your payment ID.";

			if (error.response) {
				if (error.response.status === 401) {
					errorMessage = "Session expired during verification. Please contact support with your payment details.";
				} else if (error.response.status === 500) {
					errorMessage = "Server error during verification. Please contact support to confirm your payment status.";
				} else if (error.response.status === 400) {
					errorMessage = error.response.data?.message || "Invalid verification request. Please contact support.";
				} else {
					errorMessage = error.response.data?.message || errorMessage;
				}
			} else if (error.message) {
				errorMessage = error.message;
			}

			setMessage(errorMessage);
			setMessageType("error");
			setTechnicalError(true);

			//  Store verification error details for support
			setPaymentError({
				orderId: razorpayResponse.razorpay_order_id,
				paymentId: razorpayResponse.razorpay_payment_id,
				signature: razorpayResponse.razorpay_signature,
				amount: plan.price,
				planId: plan.id,
				planName: plan.name,
				stage: 'verification',
				errorMessage: errorMessage,
				timestamp: new Date().toISOString()
			});

			toast.error(errorMessage, { duration: 6000 });
		} finally {
			setProcessingPayment(false);
		}
	};

	const handleRetry = () => {
		setMessage("");
		setMessageType("");
		setTechnicalError(false);
		setPaymentError(null);
		toast.success('Ready to try again');
	};

	const handleContactSupport = () => {
		setShowSupportModal(true);
	};

	return (
		<DashboardLayout>
			<div className="mb-8">
				<div className="flex items-center justify-between flex-wrap gap-4">
					<div>
						<h1 className="text-3xl font-bold text-gray-900 dark:text-white">
							Subscription Plans
						</h1>
						<p className="mt-2 text-gray-600 dark:text-gray-400">
							Purchase credits to upload more files
						</p>
					</div>
					<div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
						<Coins className="text-blue-500" size={20} />
						<span className="text-sm text-gray-600 dark:text-gray-400">Current Balance:</span>
						<span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                            {creditsLoading ? '...' : credits}
                        </span>
					</div>
				</div>

				{/* Message Display */}
				{message && (
					<div className={`mt-4 p-4 rounded-lg border ${
						messageType === 'error'
							? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
							: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
					}`}>
						<div className="flex items-start gap-3">
							{messageType === 'error' ? (
								<AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" size={20} />
							) : (
								<Check className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" size={20} />
							)}
							<div className="flex-1">
								<p className={`font-medium ${
									messageType === 'error'
										? 'text-red-700 dark:text-red-400'
										: 'text-green-700 dark:text-green-400'
								}`}>
									{message}
								</p>

								{/* Show payment details if available */}
								{paymentError && paymentError.paymentId && (
									<p className="text-sm text-red-600 dark:text-red-400 mt-2">
										Payment ID: <span className="font-mono">{paymentError.paymentId}</span>
									</p>
								)}

								{/* Action Buttons for Errors */}
								{technicalError && (
									<div className="flex flex-wrap gap-3 mt-4">
										<button
											onClick={handleRetry}
											className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer"
										>
											<RefreshCw size={16} />
											Try Again
										</button>
										<button
											onClick={handleContactSupport}
											className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-600 transition-colors duration-200 cursor-pointer"
										>
											<AlertCircle size={16} />
											Contact Support
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
				{plans.map((plan) => (
					<div
						key={plan.id}
						className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-200 hover:shadow-xl ${
							plan.recommended ? 'ring-2 ring-blue-500 scale-105' : ''
						}`}
					>
						{plan.recommended && (
							<div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                <span className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                                    <Sparkles size={14} />
                                    RECOMMENDED
                                </span>
							</div>
						)}

						<div className="text-center mb-6">
							<h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
								{plan.name}
							</h3>
							<div className="flex items-baseline justify-center gap-2 mb-4">
								<span className="text-4xl font-bold text-blue-500">₹{plan.price}</span>
								<span className="text-gray-500 dark:text-gray-400">one-time</span>
							</div>
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg">
								<Coins className="text-blue-500" size={18} />
								<span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {plan.credits} Credits
                                </span>
							</div>
						</div>

						<ul className="space-y-3 mb-8">
							{plan.features.map((feature, index) => (
								<li key={index} className="flex items-start gap-3">
									<Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
									<span className="text-gray-700 dark:text-gray-300">{feature}</span>
								</li>
							))}
						</ul>

						<button
							onClick={() => handlePurchase(plan)}
							disabled={processingPayment || !razorpayLoaded}
							className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
								plan.recommended
									? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl cursor-pointer'
									: 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer'
							} disabled:opacity-50 disabled:cursor-not-allowed`}
						>
							{processingPayment ? (
								<>
									<Loader2 className="animate-spin" size={18} />
									Processing...
								</>
							) : !razorpayLoaded ? (
								<>
									<Loader2 className="animate-spin" size={18} />
									Loading Payment Gateway...
								</>
							) : (
								`Purchase ${plan.name}`
							)}
						</button>
					</div>
				))}
			</div>

			{/* Info Section */}
			<div className="mt-12 max-w-4xl mx-auto">
				<div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
						How Credits Work
					</h3>
					<ul className="space-y-2 text-gray-700 dark:text-gray-300">
						<li className="flex items-start gap-2">
							<span className="text-blue-500 font-bold">•</span>
							<span>Each file upload consumes credits based on file size</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 font-bold">•</span>
							<span>Credits never expire and can be used anytime</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 font-bold">•</span>
							<span>Secure payment gateway powered by Razorpay</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 font-bold">•</span>
							<span>Instant credit addition after successful payment</span>
						</li>
						<li className="flex items-start gap-2">
							<span className="text-blue-500 font-bold">•</span>
							<span>24/7 support available for any payment issues</span>
						</li>
					</ul>
				</div>
			</div>

			{/* Support Modal */}
			<SupportModal
				isOpen={showSupportModal}
				onClose={() => setShowSupportModal(false)}
				paymentError={paymentError}
			/>
		</DashboardLayout>
	);
};

export default Subscription;
