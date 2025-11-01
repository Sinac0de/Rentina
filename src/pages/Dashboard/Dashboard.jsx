import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/authStore";
import { getDashboardStats } from "../../services/api";
import {
  Car,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  PieChart,
} from "lucide-react";

const Dashboard = () => {
  const { user, isAuthenticated, checkAuthStatus } = useAuthStore();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthStatus();
      if (!isAuth || user?.role !== "admin") {
        navigate("/");
      }
    };

    checkAuth();
  }, [checkAuthStatus, navigate, user?.role]);

  useEffect(() => {
    const fetchStats = async () => {
      if (user?.role !== "admin") return;

      setLoading(true);
      setError(null);

      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError(err.message || "Failed to fetch dashboard stats");
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated && user?.role === "admin") {
      fetchStats();
    }
  }, [isAuthenticated, user?.role]);

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-32 bg-gray-200 dark:bg-gray-700 rounded"
                ></div>
              ))}
            </div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-lg font-medium text-red-800">Error</h3>
            <p className="mt-2 text-red-600">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Welcome back, {user?.name}. Here is what is happening with your car
            rental business.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <Car className="text-blue-600 dark:text-blue-400" size={24} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Cars
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats?.stats?.cars || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Users
                  className="text-green-600 dark:text-green-400"
                  size={24}
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Total Users
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats?.stats?.users || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <BookOpen
                  className="text-purple-600 dark:text-purple-400"
                  size={24}
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Published Blogs
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats?.stats?.blogs || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <Calendar
                  className="text-yellow-600 dark:text-yellow-400"
                  size={24}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Popular Cars Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Popular Car Categories
              </h2>
              <BarChart3
                className="text-gray-500 dark:text-gray-400"
                size={20}
              />
            </div>
            <div className="space-y-4">
              {stats?.categories?.slice(0, 5).map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category._id}
                    </span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          (category.count /
                            Math.max(...stats.categories.map((c) => c.count))) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Blogs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Featured Blog Posts
              </h2>
              <PieChart
                className="text-gray-500 dark:text-gray-400"
                size={20}
              />
            </div>
            <div className="space-y-4">
              {stats?.featuredBlogs?.length > 0 ? (
                stats.featuredBlogs.map((blog, index) => (
                  <div key={index} className="flex items-start">
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    )}
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        by {blog.author?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No featured blogs
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <button
              onClick={() => navigate("/cars")}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Car
                className="text-blue-600 dark:text-blue-400 mb-2"
                size={24}
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Manage Cars
              </span>
            </button>
            <button
              onClick={() => navigate("/blogs")}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <BookOpen
                className="text-purple-600 dark:text-purple-400 mb-2"
                size={24}
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Manage Blogs
              </span>
            </button>
            <button
              onClick={() => navigate("/users")}
              className="flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <Users
                className="text-green-600 dark:text-green-400 mb-2"
                size={24}
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Manage Users
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
