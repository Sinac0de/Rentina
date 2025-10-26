const StatisticsSection = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Cars in Fleet" },
    { number: "24/7", label: "Support Available" },
    { number: "50+", label: "Locations Worldwide" },
  ];

  return (
    <section className="py-16 bg-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="text-white">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-lg opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
