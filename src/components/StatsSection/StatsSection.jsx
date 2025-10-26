import { useEffect, useState } from "react";
import { getDashboardStats } from "src/services/api";

const StatsSection = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data.stats);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Impact
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Trusted by thousands of customers worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 text-center animate-pulse"
              >
                <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded w-24 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Our Impact
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Trusted by thousands of customers worldwide
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stats?.cars.toLocaleString() || 0}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Cars Available</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {stats?.users.toLocaleString() || 0}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Happy Customers</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {stats?.bookings.toLocaleString() || 0}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">Bookings Made</p>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {stats?.availableCars.toLocaleString() || 0}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Cars Rented Today
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
