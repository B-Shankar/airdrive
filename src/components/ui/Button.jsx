import React from 'react';

const Button = ({
	                children,
	                onClick,
	                variant = 'primary',
	                size = 'md',
	                className = '',
	                disabled = false,
	                type = 'button',
	                ...props
                }) => {
	// Base styles that all buttons share
	const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

	// Variant styles
	const variants = {
		primary: 'text-white bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-xl',
		secondary: 'text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-blue-500 shadow-lg hover:shadow-xl',
		dark: 'text-white bg-blue-700 dark:bg-blue-900 hover:bg-blue-800 dark:hover:bg-blue-950',
		light: 'text-blue-600 dark:text-blue-700 bg-white dark:bg-gray-100 hover:bg-blue-50 dark:hover:bg-gray-50 shadow-lg',
		outline: 'text-gray-700 dark:text-gray-300 bg-transparent border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800',
	};

	// Size styles
	const sizes = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-6 py-3 md:py-4 md:text-lg md:px-10',
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;
