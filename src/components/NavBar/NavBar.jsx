import { Link } from "react-router";
import ProfileIcon from "../../assets/Icons/ProfileIcon";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import useAuthStore from "../../store/authStore";
import { useEffect, useState } from "react";
import LogoutModal from "../common/LogoutModal";

const NavBar = () => {
  const { user, isAuthenticated, isLoading, checkAuthStatus } = useAuthStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    // Check authentication status on component mount
    checkAuthStatus();
  }, [checkAuthStatus]);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center gap-5 h-fit">
        <AnimatedThemeToggler
          className={
            "dark:border-slate-500 p-2 border rounded-full cursor-pointer text-[#596780]"
          }
        />
        <div className="flex items-center gap-2 dark:border-slate-500 p-2 border rounded-xl px-5">
          <span className="dark:text-slate-300 text-secondary-500 font-semibold text-sm lg:text-base">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-5 h-fit">
        <AnimatedThemeToggler
          className={
            "dark:border-slate-500 p-2 border rounded-full cursor-pointer text-[#596780]"
          }
        />

        {/* Authentication links */}
        {isAuthenticated && user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-5 dark:border-slate-500 p-2 border rounded-xl">
              <Link
                to="/profile"
                className="dark:text-slate-300 dark:hover:text-blue-600 text-secondary-500 hover:text-blue-600 flex items-center gap-1"
              >
                <ProfileIcon color="#1e88e5" />
                <span>{user?.name || user?.email || "Profile"}</span>
              </Link>
              <button
                onClick={handleLogoutClick}
                className="dark:text-slate-300 text-secondary-500 font-semibold text-sm lg:text-base hover:text-blue-600"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 dark:border-slate-500 p-2 border rounded-xl px-5">
            <Link
              to="/signin"
              className="dark:text-slate-300 text-secondary-500 font-semibold text-sm lg:text-base hover:text-blue-600"
            >
              Sign In
            </Link>
            <span className="dark:text-slate-300 text-secondary-500">|</span>
            <Link
              to="/signup"
              className="dark:text-slate-300 text-secondary-500 font-semibold text-sm lg:text-base hover:text-blue-600"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={() => (window.location.href = "/")}
      />
    </>
  );
};

export default NavBar;
