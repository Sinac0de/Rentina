import { CarIcon, X } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import FavoritesIcon from "../../assets/Icons/FavoritesIcon";
import ProfileIcon from "../../assets/Icons/ProfileIcon";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const MobileNavBar = ({ isNavCollapsed, setIsNavCollapsed }) => {
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
        <div className="px-3 flex-1 overflow-y-auto flex flex-col gap-2">
          <NavLink
            onClick={() => setIsNavCollapsed(true)}
            to="/cars"
            className="border-2 p-4 border-secondary-400 rounded-full cursor-pointer flex items-center gap-2"
          >
            <CarIcon />
            <h3>Cars</h3>
          </NavLink>

          <NavLink
            to="/favorites"
            className="border-2 p-4 border-secondary-400 rounded-full cursor-pointer flex items-center gap-2"
          >
            <FavoritesIcon />
            <h3>Favorites</h3>
          </NavLink>
        </div>

        {/* Nav Footer */}
        <div className="w-full px-5 py-5 flex flex-col gap-3 h-[23%] justify-end">
          <AnimatedThemeToggler
            title="Toggle theme"
            className={
              "border-2 p-4 border-secondary-400 rounded-full cursor-pointer flex items-center justify-start gap-2 text-[#596780]"
            }
          />
          <div className="flex flex-col gap-3">
            <Link
              to="/signin"
              className="dark:border-none p-4 bg-primary-500 text-white border-secondary-400 rounded-full cursor-pointer flex items-center gap-2 hover:bg-primary-600 transition-colors"
              onClick={() => setIsNavCollapsed(true)}
            >
              <ProfileIcon color="white" />
              <h3 className="text-base font-semibold">Sign In</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavBar;
