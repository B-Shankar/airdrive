import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const Dropdown = ({
	                  options,
	                  value,
	                  onChange,
	                  placeholder = 'Select option',
	                  icon: Icon,
	                  label
                  }) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const selectedOption = options.find(opt => opt.value === value);

	const handleSelect = (optionValue) => {
		onChange(optionValue);
		setIsOpen(false);
	};

	return (
		<div className="relative" ref={dropdownRef}>
			{label && (
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
					{label}
				</label>
			)}

			{/* Dropdown Button */}
			<button
				type="button"
				onClick={() => setIsOpen(!isOpen)}
				className="w-full flex items-center justify-between gap-3 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
			>
				<div className="flex items-center gap-2 flex-1 text-left">
					{Icon && <Icon size={18} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />}
					<span className={`text-sm font-medium ${
						selectedOption
							? 'text-gray-900 dark:text-white'
							: 'text-gray-500 dark:text-gray-400'
					}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
				</div>
				<ChevronDown
					size={18}
					className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 flex-shrink-0 ${
						isOpen ? 'rotate-180' : ''
					}`}
				/>
			</button>

			{/* Dropdown Menu */}
			{isOpen && (
				<>
					{/* Mobile backdrop */}
					<div
						className="fixed inset-0 bg-black/20 z-40 sm:hidden"
						onClick={() => setIsOpen(false)}
					/>

					{/* Dropdown Options */}
					<div className={`
                        absolute right-0 mt-2 w-full sm:w-auto sm:min-w-[200px] 
                        bg-white dark:bg-gray-800 
                        border border-gray-200 dark:border-gray-700 
                        rounded-lg shadow-xl
                        max-h-[280px] overflow-y-auto
                        z-50
                        animate-in fade-in slide-in-from-top-2 duration-200
                    `}>
						<div className="py-1">
							{options.map((option) => (
								<button
									key={option.value}
									onClick={() => handleSelect(option.value)}
									className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 ${
										option.value === value
											? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium'
											: 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
									}`}
								>
									<div className="flex items-center justify-between gap-2">
										<span>{option.label}</span>
										{option.count !== undefined && (
											<span className={`text-xs px-2 py-0.5 rounded-full ${
												option.value === value
													? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300'
													: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
											}`}>
                                                {option.count}
                                            </span>
										)}
									</div>
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Dropdown;
