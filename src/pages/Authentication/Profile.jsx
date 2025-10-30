import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import useAuthStore from "../../store/authStore";
import { User, Heart, BookOpen, Calendar, CreditCard } from "lucide-react";
import { getFavoriteCars } from "../../services/api";
import CarCard from "../../components/CarCard/CarCard";
import SkeletonCard from "../../components/CarCard/SkeletonCard";

const Profile = () => {
  const { user, isAuthenticated, checkAuthStatus } = useAuthStore();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthStatus();
      if (!isAuth) {
        navigate("/signin");
      }
    };

    checkAuth();
  }, [checkAuthStatus, navigate]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!isAuthenticated || !user) return;

      setLoadingFavorites(true);
      try {
        const data = await getFavoriteCars();
        setFavorites(data.slice(0, 4) || []); // Show only first 4 favorites
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoadingFavorites(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex justify-center items-center">
                <User className="text-gray-600" size={40} />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-white">
                  {user?.name || "User Profile"}
                </h1>
                <p className="text-blue-100">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* User Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <Heart className="mx-auto text-red-500" size={24} />
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Favorites
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {user?.favorites?.length || 0} cars
                </p>
                <Link
                  to="/favorites"
                  className="mt-2 text-primary-500 hover:text-primary-600 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <BookOpen className="mx-auto text-blue-500" size={24} />
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Blog Posts
                </h3>
                <p className="text-gray-500 dark:text-gray-400">0 posts</p>
                <Link
                  to="/blogs"
                  className="mt-2 text-primary-500 hover:text-primary-600 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <Calendar className="mx-auto text-green-500" size={24} />
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Bookings
                </h3>
                <p className="text-gray-500 dark:text-gray-400">0 bookings</p>
                <Link
                  to="/bookings"
                  className="mt-2 text-primary-500 hover:text-primary-600 text-sm font-medium"
                >
                  View All
                </Link>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <CreditCard className="mx-auto text-purple-500" size={24} />
                <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
                  Payments
                </h3>
                <p className="text-gray-500 dark:text-gray-400">0 payments</p>
                <Link
                  to="/payments"
                  className="mt-2 text-primary-500 hover:text-primary-600 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
            </div>

            {/* Favorite Cars Preview */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Your Favorite Cars
                </h2>
                <Link
                  to="/favorites"
                  className="text-primary-500 hover:text-primary-600 font-medium"
                >
                  View All Favorites
                </Link>
              </div>

              {loadingFavorites ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-4 gap-6">
                  {favorites.map((car) => (
                    <CarCard key={car._id} carData={car} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 text-center">
                  <Heart className="mx-auto text-gray-400" size={48} />
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    No favorite cars yet
                  </h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    Start adding cars to your favorites list
                  </p>
                  <Link
                    to="/cars"
                    className="mt-4 inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
                  >
                    Browse Cars
                  </Link>
                </div>
              )}
            </div>

            {/* Personal Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Information
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Full Name
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {user?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email Address
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {user?.email || "N/A"}
                    </p>
                  </div>
                  {user?.phone && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Phone Number
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {user.phone}
                      </p>
                    </div>
                  )}
                  {user?.location && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Location
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {user.location}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Account Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Member Since
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Account Status
                    </p>
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      Active
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Role
                    </p>
                    <p className="text-gray-900 dark:text-white capitalize">
                      {user?.role || "user"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/profile/edit")}
                className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
