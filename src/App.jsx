import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadFile from "./pages/UploadFile.jsx";
import MyFiles from "./pages/MyFiles.jsx";
import Subscription from "./pages/Subscription.jsx";
import Transactions from "./pages/Transactions.jsx";
import { useAuth } from "@clerk/clerk-react";
import Loading from "./components/ui/Loading.jsx";
import {Toaster} from "react-hot-toast";
import {UserCreditsProvider} from "./context/UserCreditsContext.jsx";

const ProtectedRoute = ({ children }) => {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) {
		return <Loading />;
	}

	return isSignedIn ? children : <Navigate to="/" replace />;
};

const App = () => {
	return (
		<UserCreditsProvider>
			<BrowserRouter>
				<Toaster />
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
					<Route path="/upload" element={<ProtectedRoute><UploadFile /></ProtectedRoute>} />
					<Route path="/my-files" element={<ProtectedRoute><MyFiles /></ProtectedRoute>} />
					<Route path="/subscription" element={<ProtectedRoute><Subscription /></ProtectedRoute>} />
					<Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</UserCreditsProvider>
	);
};

export default App;
