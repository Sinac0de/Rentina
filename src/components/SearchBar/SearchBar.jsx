import { useState } from "react";
import { useNavigate } from "react-router";
import SearchIcon from "../../assets/Icons/SearchIcon";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  /* === Handlers === */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
      setSearchValue("");
    }
  };

  return (
    <div className="flex gap-3 my-5 relative lg:flex-1 lg:max-w-[492px] lg:h-11">
      <form onSubmit={handleSubmit} className="w-full">
        <label
          htmlFor="search"
          className="absolute left-6 top-1 bottom-0 flex items-center z-10 opacity-80"
        >
          <SearchIcon />
        </label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for cars, blogs..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="dark:bg-slate-800 dark:border-slate-500 dark:placeholder:text-slate-300 dark:text-slate-300 dark:focus:outline-none w-full relative flex items-center flex-1 gap-2 p-3 pl-14 rounded-lg border lg:rounded-full"
        />
      </form>
    </div>
  );
};

export default SearchBar;
