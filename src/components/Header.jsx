import { Link } from "react-router";
import HamMenuIcon from "../assets/Icons/HamMenuIcon";
import NavBar from "./NavBar/NavBar";
import SearchBar from "./SearchBar/SearchBar";

const Header = ({ setIsNavCollapsed }) => {
  const handleNavCollapse = () => {
    setIsNavCollapsed(false);
  };

  return (
    <header className="dark:bg-slate-900 bg-white flex w-full sticky top-0 z-20 xl:h-24 xl:shadow-sm">
      <div className="w-full flex flex-col justify-center px-7 xl:pr-2 xl:flex-row xl:items-center xl:justify-start xl:gap-16 xl:pl-16 xl:w-4/6">
        {/*----- LOGO & SEARCH BAR -----*/}
        <div className="flex justify-between items-center mt-5 xl:mt-0 ">
          <Link
            to="/"
            className="font-bold text-primary-500 text-2xl xl:text-[32px]"
          >
            Rentina
          </Link>
          <button onClick={handleNavCollapse} className="xl:hidden">
            <HamMenuIcon />
          </button>
        </div>
        <SearchBar />
      </div>

      {/*----- NAV BAR & PROFILE -----*/}
      <div className="hidden xl:flex items-center justify-end pr-10 flex-1">
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
