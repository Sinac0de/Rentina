import {
  BookOpen,
  Car,
  CarIcon,
  Heart,
  HomeIcon,
  LogOut,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import ProfileIcon from "../../assets/Icons/ProfileIcon";
import useAuthStore from "../../store/authStore";
import LogoutModal from "../common/LogoutModal";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const MobileNavBar = ({ isNavCollapsed, setIsNavCollapsed }) => {
  const { isAuthenticated, user } = useAuthStore();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  const confirmLogout = () => {
    setIsNavCollapsed(true);
  };

  const navLinks = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/cars", label: "Cars", icon: CarIcon },
    { to: "/rented-cars", label: "Rented Cars", icon: Car },
    { to: "/favorites", label: "Favorites", icon: Heart },
    { to: "/blog", label: "Blog", icon: BookOpen },
  ];

  return (
    <>
      <div
        className={`${
          isNavCollapsed
            ? "opacity-0 translate-x-full"
            : "opacity-100 translate-x-0"
        } w-full h-full fixed right-0 left-0 bottom-0 top-0 z-[998] bg-black/70 transition-opacity duration-500`}
        onClick={() => setIsNavCollapsed(true)}
      ></div>
      <div
        className={`dark:bg-slate-900 dark:border-slate-800 ${
          isNavCollapsed ? "translate-x-full" : "translate-x-0"
        } fixed right-0 bottom-0 bg-white border-l-2 shadow-2xl rounded-l-3xl h-full w-3/4 z-[999] transition-transform duration-500 flex flex-col text-secondary-400 overflow-y-auto`}
      >
        <X
          onClick={() => setIsNavCollapsed(true)}
          className="absolute top-5 right-5 cursor-pointer"
        />
        <div className="flex justify-center items-center h-[15%]">
          <h2 className="font-bold text-primary-500 text-2xl">Rentina</h2>
        </div>

        {/* Nav body */}
        <div className="px-3 flex-1 overflow-y-auto flex flex-col gap-1 py-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              onClick={() => setIsNavCollapsed(true)}
              to={link.to}
              className={({ isActive }) =>
                `p-4 rounded-xl cursor-pointer flex items-center gap-3 transition-all ${
                  isActive
                    ? "bg-primary-500 text-white shadow-lg"
                    : "hover:bg-gray-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <link.icon size={20} />
              <span className="font-medium">{link.label}</span>
            </NavLink>
          ))}
        </div>

        {/* Nav Footer */}
        <div className="w-full px-5 py-5 flex flex-col gap-3 h-auto border-t border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <AnimatedThemeToggler
              title="Toggle theme"
              className={
                "p-3 rounded-full cursor-pointer flex items-center justify-center gap-1 text-slate-900 dark:text-slate-300 w-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              }
            />
          </div>

          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <NavLink
                to="/profile"
                onClick={() => setIsNavCollapsed(true)}
                className={({ isActive }) =>
                  `p-4 rounded-xl cursor-pointer flex items-center gap-3 transition-all  ${
                    isActive
                      ? "bg-primary-500 text-white shadow-lg"
                      : "bg-slate-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 "
                  }`
                }
              >
                <User size={20} />
                <span className="font-medium">{user.name}</span>
              </NavLink>
              <button
                onClick={handleLogoutClick}
                className="p-4 rounded-xl cursor-pointer flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/signin"
              className="p-4 bg-primary-500 text-white rounded-xl cursor-pointer flex items-center justify-center gap-2 hover:bg-primary-600 transition-colors"
              onClick={() => setIsNavCollapsed(true)}
            >
              <ProfileIcon color="white" />
              <span className="font-semibold">Sign In</span>
            </Link>
          )}
        </div>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={closeLogoutModal}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default MobileNavBar;
