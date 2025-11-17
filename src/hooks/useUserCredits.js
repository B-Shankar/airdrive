import { useContext } from 'react';
import { UserCreditsContext } from '../context/UserCreditsContext';

export const useUserCredits = () => {
	const context = useContext(UserCreditsContext);

	if (!context) {
		throw new Error('useUserCredits must be used within UserCreditsProvider');
	}

	return context;
};
