import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import NotFound from "./pages/NotFound.jsx";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Landing />} />

				{/* Catch-all route for unmatched paths */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;