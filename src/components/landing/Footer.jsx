import { Mail, Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
	return (
		<footer className="bg-gray-900 dark:bg-black text-gray-300 dark:text-gray-400 py-12 sm:py-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					{/* Brand Section */}
					<div className="col-span-1">
						<h3 className="text-xl font-bold text-white dark:text-white mb-4">
							Air<span className="text-blue-500">Drive</span>
						</h3>
						<p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
							Secure file sharing and storage made simple. Share files quickly & securely with end-to-end encryption.
						</p>
						{/* Social Media Links */}
						<div className="flex items-center gap-4 mt-6">
							<a
								href="#"
								className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
								aria-label="Twitter"
							>
								<Twitter size={20} />
							</a>
							<a
								href="#"
								className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
								aria-label="LinkedIn"
							>
								<Linkedin size={20} />
							</a>
							<a
								href="#"
								className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
								aria-label="GitHub"
							>
								<Github size={20} />
							</a>
							<a
								href="#"
								className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200"
								aria-label="Email"
							>
								<Mail size={20} />
							</a>
						</div>
					</div>

					{/* Product Links */}
					<div>
						<h4 className="text-sm font-semibold text-white dark:text-white mb-4 uppercase tracking-wide">
							Product
						</h4>
						<ul className="space-y-3">
							<li>
								<a href="#features" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Features
								</a>
							</li>
							<li>
								<a href="#pricing" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Pricing
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Security
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Updates
								</a>
							</li>
						</ul>
					</div>

					{/* Company Links */}
					<div>
						<h4 className="text-sm font-semibold text-white dark:text-white mb-4 uppercase tracking-wide">
							Company
						</h4>
						<ul className="space-y-3">
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									About Us
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Blog
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Careers
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Contact
								</a>
							</li>
						</ul>
					</div>

					{/* Legal Links */}
					<div>
						<h4 className="text-sm font-semibold text-white dark:text-white mb-4 uppercase tracking-wide">
							Legal
						</h4>
						<ul className="space-y-3">
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Terms of Service
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									Cookie Policy
								</a>
							</li>
							<li>
								<a href="#" className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-sm">
									GDPR
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-800 dark:border-gray-700 my-8"></div>

				{/* Bottom Footer */}
				<div className="flex flex-col sm:flex-row items-center justify-between">
					<p className="text-sm text-gray-400 dark:text-gray-500">
						&copy; {new Date().getFullYear()} AirDrive, All rights reserved.
					</p>
					<div className="flex gap-4 mt-4 sm:mt-0">
						<a href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
							Privacy
						</a>
						<span className="text-gray-600 dark:text-gray-700">•</span>
						<a href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
							Terms
						</a>
						<span className="text-gray-600 dark:text-gray-700">•</span>
						<a href="#" className="text-xs text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200">
							Cookies
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
