import {ArrowUpCircle, Clock, CreditCard, FileText, Share2, Shield} from "lucide-react";

const FeaturesSection = ({ features }) => {

	const renderIcon = (iconName, iconColor) => {
		const iconProps = {size: 25, className: iconColor};

		switch (iconName) {
			case 'ArrowUpCircle':
				return <ArrowUpCircle {...iconProps} />;
			case 'Shield':
				return <Shield {...iconProps} />;
			case 'Share2':
				return <Share2 {...iconProps} />;
			case 'CreditCard':
				return <CreditCard {...iconProps} />;
			case 'FileText':
				return <FileText {...iconProps} />;
			case 'Clock':
				return <Clock {...iconProps} />;
			default:
				return <FileText {...iconProps} />;
		}
	}

	return (
		<div id="features" className="py-20 bg-white dark:bg-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
						Everything you need for file sharing
					</h2>
					<p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
						Air Drive provides all the tools you need to manage your digital content
					</p>
				</div>
				<div className="mt-16">
					<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{features.map((feature, index) => (
							<div key={index} className="pt-5 border border-gray-100 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 bg-white dark:bg-gray-800">
								<div className="flow-root bg-gray-50 dark:bg-gray-900 rounded-lg px-6 pb-8">
									<div className="-mt-6">
										<div className="inline-flex items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-md shadow-lg">
											{renderIcon(feature.iconName, feature.iconColor)}
										</div>
										<div className="mt-5 text-lg font-medium text-gray-900 dark:text-white tracking-tight">
											{feature.title}
										</div>
										<p className="mt-2 text-base text-gray-500 dark:text-gray-400">
											{feature.description}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default FeaturesSection;
