import { Link } from "react-router";
import HamMenuIcon from "../assets/Icons/HamMenuIcon";
import NavBar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";

const Header = ({ setIsNavCollapsed }) => {
  const handleNavCollapse = () => {
    setIsNavCollapsed(false);
  };

  return (
    <header className="dark:bg-slate-900 bg-white flex w-full sticky top-0 z-20 lg:h-24 lg:shadow-sm">
      <div className="w-full flex flex-col justify-center px-7 lg:pr-2 lg:flex-row lg:items-center lg:justify-start lg:gap-16 lg:pl-16 lg:w-4/6">
        {/*----- LOGO & SEARCH BAR -----*/}
        <div className="flex justify-between items-center mt-5 lg:mt-0 ">
          <Link
            to="/"
            className="font-bold text-primary-500 text-2xl lg:text-[32px]"
          >
            Rentina
          </Link>
          <button onClick={handleNavCollapse} className="lg:hidden">
            <HamMenuIcon />
          </button>
        </div>
        <SearchBar />
      </div>

      {/*----- NAV BAR & PROFILE -----*/}
      <div className="hidden lg:flex items-center justify-end pr-10 flex-1">
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
