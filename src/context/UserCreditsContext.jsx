import { createContext, useCallback, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { userService} from "../api/index.js";
import toast from "react-hot-toast";

export const UserCreditsContext = createContext();

export const UserCreditsProvider = ({ children }) => {
	const [credits, setCredits] = useState(0);
	const [plan, setPlan] = useState(null);
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

			console.log('Credits fetched successfully:', data);
		} catch (error) {
			console.error('Error fetching credits:', error);
			toast.error('Failed to load credits. Please try again.');
		} finally {
			setLoading(false);
		}
	}, [getToken, isSignedIn]);

	// Update credits locally (optimistic update)
	const updateCredits = useCallback((newCredits) => {
		console.log("Updating Credits:", newCredits);
		setCredits(newCredits);
	}, []);

	// Deduct credits (e.g., after file upload)
	const deductCredits = useCallback((amount) => {
		setCredits(prev => Math.max(0, prev - amount));
	}, []);

	// Add credits (e.g., after purchase)
	const addCredits = useCallback((amount) => {
		setCredits(prev => prev + amount);
	}, []);

	// Initial fetch on mount
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
		deductCredits,
		addCredits,
	};

	return (
		<UserCreditsContext.Provider value={contextValue}>
			{children}
		</UserCreditsContext.Provider>
	);
};
