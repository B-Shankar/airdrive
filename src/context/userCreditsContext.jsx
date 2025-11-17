import { createContext, useCallback, useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { userService } from '../api';
import toast from 'react-hot-toast';

export const UserCreditsContext = createContext();

export const UserCreditsProvider = ({ children }) => {
	const [credits, setCredits] = useState(0);
	const [plan, setPlan] = useState('BASIC');
	const [loading, setLoading] = useState(false);
	const { getToken, isSignedIn } = useAuth();

	// Function to fetch user credits that can be called from anywhere
	const fetchUserCredits = useCallback(async () => {
		if (!isSignedIn) return;

		setLoading(true);

		try {
			const token = await getToken();
			const data = await userService.getUserCredits(token);

			setCredits(data.credits);
			setPlan(data.plan);

			console.log('User credits fetched:', data);
		} catch (error) {
			console.error('Error fetching user credits:', error);
			toast.error('Failed to fetch user credits');
		} finally {
			setLoading(false);
		}
	}, [getToken, isSignedIn]);

	// Update credits manually (e.g., after file upload/delete)
	const updateCredits = useCallback((newCredits) => {
		console.log('Updating credits to:', newCredits);
		setCredits(newCredits);
	}, []);

	// Decrease credits by a certain amount
	const decreaseCredits = useCallback((amount = 1) => {
		setCredits((prev) => Math.max(0, prev - amount));
	}, []);

	// Increase credits by a certain amount
	const increaseCredits = useCallback((amount = 1) => {
		setCredits((prev) => prev + amount);
	}, []);

	// Fetch credits on mount and when user signs in
	useEffect(() => {
		if (isSignedIn) {
			fetchUserCredits();
		}
	}, [isSignedIn, fetchUserCredits]);

	const contextValue = {
		credits,
		plan,
		loading,
		setCredits,
		fetchUserCredits,
		updateCredits,
		decreaseCredits,
		increaseCredits,
	};

	return (
		<UserCreditsContext.Provider value={contextValue}>
			{children}
		</UserCreditsContext.Provider>
	);
};
