import { useState } from "react";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Los Angeles, CA",
      rating: 5,
      content:
        "Rentina made my vacation planning so much easier. The car was in perfect condition and the pickup process was seamless. I'll definitely be using them again!",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "New York, NY",
      rating: 5,
      content:
        "As a frequent business traveler, I need reliability and efficiency. Rentina delivers on both. Their customer service is outstanding and their vehicles are always well-maintained.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Miami, FL",
      rating: 4,
      content:
        "Great experience overall! The website is user-friendly and the prices are competitive. My only suggestion would be to expand the electric vehicle options.",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="my-10 rounded-2xl py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Trusted by thousands of satisfied customers worldwide
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 md:p-12">
            <div className="flex items-center mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-400 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 leading-relaxed">
              "{current.content}"
            </blockquote>

            <div className="flex items-center">
              <div className="ml-4">
                <cite className="font-semibold text-gray-900 dark:text-white block">
                  {current.name}
                </cite>
                <span className="text-gray-500 dark:text-gray-400">
                  {current.location}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
            aria-label="Next testimonial"
          >
            <svg
              className="w-6 h-6 text-gray-600 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial
                  ? "bg-primary-500"
                  : "bg-gray-300 dark:bg-gray-600"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
