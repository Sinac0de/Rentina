import { Link } from "react-router-dom";
import FavoritesIcon from "../../assets/Icons/FavoritesIcon";
import ProfileIcon from "../../assets/Icons/ProfileIcon";
import SettingsIcon from "../../assets/Icons/SettingsIcon";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const NavBar = () => {
  return (
    <div className="flex items-center gap-5 h-fit">
      <AnimatedThemeToggler
        className={
          "dark:border-slate-500 p-2 border rounded-full cursor-pointer text-[#596780]"
        }
      />

      {/* Authentication links */}
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
    </div>
  );
};

export default NavBar;
