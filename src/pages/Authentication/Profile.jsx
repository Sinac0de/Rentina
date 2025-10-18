import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuthStore from "../../store/authStore";
import { User } from "lucide-react";

const Profile = () => {
  const { user, isAuthenticated, checkAuthStatus } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await checkAuthStatus();
      if (!isAuth) {
        navigate("/signin");
      }
    };

    checkAuth();
  }, [checkAuthStatus, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activity
              </h2>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No recent activity to display
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
