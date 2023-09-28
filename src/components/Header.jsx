import { Link } from "react-router-dom";
import HamMenuIcon from "../assets/Icons/HamMenuIcon";
import NavBar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";

const Header = ({ setIsNavCollapsed }) => {
  const handleNavCollapse = () => {
    setIsNavCollapsed(false);
  };

  return (
    <header className="bg-white flex w-full sticky top-0 z-20 md:h-24 md:shadow-sm">
      <div className="w-full flex flex-col justify-center px-7 md:pr-2 md:flex-row md:items-center md:justify-start md:gap-16 md:pl-16 md:w-4/6">
        {/*----- LOGO & SEARCH BAR -----*/}
        <div className="flex justify-between items-center mt-5 md:mt-0 ">
          <Link
            to="/"
            className="font-bold text-primary-500 text-2xl md:text-[32px]"
          >
            Rentina
          </Link>
          <button onClick={handleNavCollapse} className="md:hidden">
            <HamMenuIcon />
          </button>
        </div>
        <SearchBar />
      </div>

      {/*----- NAV BAR & PROFILE -----*/}
      <div className="hidden md:flex items-center justify-end pr-10 flex-1">
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
