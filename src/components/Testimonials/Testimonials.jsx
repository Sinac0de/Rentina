import { useEffect, useState } from "react";
import { getBlogs } from "src/services/api";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // Get featured blogs as testimonials
        const data = await getBlogs({ featured: true, limit: 3 });
        setTestimonials(data.blogs || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Customer Testimonials
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Hear what our customers have to say
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 animate-pulse"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                  <div className="ml-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Customer Testimonials
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Hear what our customers have to say
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {testimonial.author?.avatar ? (
                  <img
                    src={testimonial.author.avatar}
                    alt={testimonial.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <span className="text-primary-600 dark:text-primary-300 font-semibold">
                      {testimonial.author?.name?.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {testimonial.author?.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.category}
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 italic">
                \"
                {testimonial.excerpt ||
                  testimonial.content.substring(0, 120) + "..."}
                \"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
