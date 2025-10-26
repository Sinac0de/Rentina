const ValueProposition = () => {
  const features = [
    {
      title: "Wide Selection",
      description:
        "Choose from hundreds of vehicles including economy, luxury, SUVs, and electric cars",
    },
    {
      title: "Competitive Pricing",
      description:
        "Lowest prices guaranteed with transparent pricing and no hidden fees",
    },
    {
      title: "Easy Booking",
      description:
        "Simple 3-step booking process with instant confirmation and digital documents",
    },
    {
      title: "Flexible Pickup",
      description:
        "Multiple pickup locations including airports, city centers, and hotels",
    },
  ];

  return (
    <section className="my-10 py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Our Commitment to Excellence
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Experience car rental done right
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
