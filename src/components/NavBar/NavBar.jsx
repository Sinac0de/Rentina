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
      <span className="dark:border-slate-500 p-2 border rounded-full cursor-pointer">
        <FavoritesIcon />
      </span>

      <span className="dark:border-slate-500 p-2 border rounded-full cursor-pointer">
        <SettingsIcon />
      </span>
      <span className="dark:border-slate-500 p-2 border rounded-full cursor-pointer">
        <ProfileIcon />
      </span>
    </div>
  );
};

export default NavBar;
