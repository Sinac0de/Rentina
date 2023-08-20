import { Link } from "react-router-dom";
import HamMenuIcon from "./Icons/HamMenuIcon";
import SearchIcon from "./Icons/SearchIcon";
import FilterIcon from "./Icons/FilterIcon";
const Header = () => {
  return (
    <header className=" bg-white flex flex-col justify-center px-7">
      <div className="flex justify-between items-center mt-5">
        <Link to="/" className="font-bold text-primary-500 text-[24px]">
          MORENT
        </Link>
        <button>
          <HamMenuIcon />
        </button>
      </div>
      <div className="flex gap-3 my-5 relative">
        <label
          htmlFor="search"
          className="absolute left-6 top-0 bottom-0 flex items-center z-50 opacity-80"
        >
          <SearchIcon />
        </label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search something here"
          className="w-full relative flex items-center flex-1 gap-2 p-3 pl-14 rounded-lg border"
        />

        <button className="p-3 border border-[#C3D4E9]/40 rounded-lg">
          <FilterIcon />
        </button>
      </div>
    </header>
  );
};

export default Header;
