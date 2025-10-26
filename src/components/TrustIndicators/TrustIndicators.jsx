const TrustIndicators = () => {
  const trustItems = [
    {
      title: "Secure Booking",
      description: "256-bit SSL encryption for all transactions",
      icon: "🔒",
    },
    {
      title: "Price Guarantee",
      description: "Best price guarantee with no hidden fees",
      icon: "💰",
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock customer service and assistance",
      icon: "📞",
    },
    {
      title: "Free Cancellation",
      description: "Free cancellation up to 48 hours before pickup",
      icon: "🔄",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Why Choose Rentina?
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            We prioritize your safety, convenience, and satisfaction
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
