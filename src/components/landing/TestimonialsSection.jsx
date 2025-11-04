import { Star } from "lucide-react";

const TestimonialsSection = ({ testimonials }) => {
	return (
		<div id="testimonials" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="relative">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
							Trusted by Professionals Worldwide
						</h2>
						<p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
							See what our users have to say about Air Drive
						</p>
					</div>
					<div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<div
								key={index}
								className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg dark:shadow-gray-900/50 overflow-hidden transform transition duration-500 hover:scale-105 border border-transparent dark:border-gray-700"
							>
								<div className="p-8">
									<div className="flex items-center">
										<div className="flex-shrink-0 h-12 w-12">
											<img
												src={testimonial.image}
												alt={testimonial.name}
												className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-700"
											/>
										</div>
										<div className="ml-4">
											<h4 className="text-lg font-bold text-gray-900 dark:text-white">
												{testimonial.name}
											</h4>
											<p className="text-sm text-gray-600 dark:text-gray-400">
												{testimonial.role}, {testimonial.company}
											</p>
										</div>
									</div>
									<div className="mt-4 flex items-center">
										{[...Array(5)].map((_, i) => (
											<Star
												key={i}
												size={16}
												className={`${i < testimonial.rating ? 'text-yellow-400 dark:text-yellow-500' : 'text-gray-300 dark:text-gray-600'} fill-current`}
											/>
										))}
									</div>
									<blockquote className="mt-4 text-base text-gray-700 dark:text-gray-300 leading-relaxed">
										"{testimonial.quote}"
									</blockquote>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default TestimonialsSection;
