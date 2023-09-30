import { getCarsByName } from "src/services/api";
import SearchIcon from "../../assets/Icons/SearchIcon";
import { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [cars, setCars] = useState([]);
  const [showBox, setShowBox] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  /* === Handlers === */
  const handleChange = async (e) => {
    setSearchValue(e.target.value);
    if (e.target.value) {
      setCars(await getCarsByName(e.target.value));
    } else {
      setCars([]);
      setShowBox(false);
    }
  };

  const handleResetSearch = () => {
    setSearchValue("");
    setCars([]);
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
        value={searchValue}
        onBlur={() => setShowBox(false)}
        onFocus={() => setShowBox(true)}
        className="dark:bg-slate-800 dark:border-slate-500 dark:placeholder:text-slate-500 dark:text-slate-500 dark:focus:outline-none w-full relative flex items-center flex-1 gap-2 p-3 pl-14 rounded-lg border md:rounded-full"
      />
      {/* searched items */}
      <div
        className={`${
          cars.length || showBox ? "" : "hidden"
        } absolute top-12 lg:top-11 left-0 right-0 mx-auto w-[90%] py-4 flex justify-center items-center bg-white overflow-hidden border border-t-0 rounded-b-xl`}
      >
        {cars.length ? (
          <div className="w-full flex flex-col gap-2 max-h-72 overflow-y-auto ">
            {cars.map((car, index) => {
              return (
                <Link
                  to={`/shop/${car.id}`}
                  key={index}
                  className="w-full flex items-center justify-between h-20 p-5 border-t-2 first:border-none "
                  onClick={handleResetSearch}
                >
                  <div className="h-full w-1/2 p-5 flex items-center">
                    <img
                      src={car.thumbnail_img}
                      className="w-full object-contain"
                    />
                  </div>
                  <h4>
                    {car.make} {car.model}
                  </h4>
                </Link>
              );
            })}
          </div>
        ) : (
          <h3>Car Not Found!</h3>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
