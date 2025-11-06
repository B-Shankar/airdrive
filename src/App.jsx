import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import NotFound from "./pages/NotFound.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {RedirectToSignIn, SignedIn, SignedOut} from "@clerk/clerk-react";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/dashboard" element={
					<>
						<SignedIn><Dashboard /></SignedIn>
						<SignedOut><RedirectToSignIn /></SignedOut>
					</>
				} />

				{/* Catch-all route for unmatched paths */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;