import FavoritesIcon from "../../assets/Icons/FavoritesIcon";
import NotificationsIcon from "../../assets/Icons/NotificationsIcon";
import ProfileIcon from "../../assets/Icons/ProfileIcon";
import SettingsIcon from "../../assets/Icons/SettingsIcon";

const NavBar = () => {
  return (
    <div className="flex items-center gap-5 h-fit">
      <span className="p-2 border rounded-full cursor-pointer">
        <FavoritesIcon />
      </span>
      <span className="p-2 border rounded-full cursor-pointer">
        <NotificationsIcon />
      </span>
      <span className="p-2 border rounded-full cursor-pointer">
        <SettingsIcon />
      </span>
      <span className="p-2 border rounded-full cursor-pointer">
        <ProfileIcon />
      </span>
    </div>
  );
};

export default NavBar;
