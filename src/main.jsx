import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, useTheme } from "./context/ThemeContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const ClerkWithTheme = ({ children }) => {
    const { darkMode } = useTheme();

    return (
        <ClerkProvider
            publishableKey={CLERK_PUBLISHABLE_KEY}
            appearance={{
                baseTheme: darkMode ? dark : undefined, // dark if dark, otherwise light
                variables: {
                    colorPrimary: "#3b82f6", // optional: your brand blue
                },
            }}
        >
            {children}
        </ClerkProvider>
    );
};

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider>
            <ClerkWithTheme>
                <App />
            </ClerkWithTheme>
        </ThemeProvider>
    </StrictMode>
);
