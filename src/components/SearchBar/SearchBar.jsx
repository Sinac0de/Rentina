import { getCarsByName } from "src/services/api";
import SearchIcon from "../Icons/SearchIcon";
import { useState } from "react";

const SearchBar = () => {
  const [cars, setCars] = useState([]);
  const handleChange = (e) => {
    setCars(getCarsByName(e.target.value));
  };

  return (
    <div className="flex gap-3 my-5 relative md:flex-1 md:max-w-[492px] md:h-11">
      <label
        htmlFor="search"
        className="absolute left-6 top-0 bottom-0 flex items-center z-10 opacity-80"
      >
        <SearchIcon />
      </label>
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search for cars..."
        onInput={handleChange}
        className="w-full relative flex items-center flex-1 gap-2 p-3 pl-14 rounded-lg border md:rounded-full"
      />
      {/* searched items */}
      <div
        className={`${
          cars.length ? "" : "max-h-0 opacity-0"
        } absolute top-0 xl:top-11 left-0 right-0 mx-auto w-[90%] bg-white border border-t-0 rounded-b-xl`}
      >
        {cars.length ? <h3>Cars Found!</h3> : <h3>Car Not Found!</h3>}
      </div>
    </div>
  );
};

export default SearchBar;
