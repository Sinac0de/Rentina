import Checkbox from "../common/Checkbox";
import RangeInput from "../common/RangeInput";
import { useState, useEffect } from "react";
import { getCarCategories, getCarMakes } from "src/services/api";
import SkeletonFilters from "./SkeletonFilters";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import CloseIcon from "src/assets/Icons/CloseIcon";

const FilterSidebar = ({ setShowMobileFilters, showMobileFilters }) => {
  /**=== Hooks ===**/
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  /* --- Filter Data --- */
  const [categories, setCategories] = useState([]);
  const [makes, setMakes] = useState([]);
  const [prices, setPrices] = useState({ min: 0, max: 500 });
  const [loading, setLoading] = useState(true);

  /**=== USE Effects ===**/
  /* --- fetch filters --- */
  useEffect(() => {
    const fetchFilters = async () => {
      setLoading(true);
      try {
        // Fetch car categories
        const categoriesData = await getCarCategories();
        setCategories(categoriesData || []);
        
        // Fetch car makes
        const makesData = await getCarMakes();
        setMakes(makesData || []);
        
        // Set price range (you might want to fetch this from API)
        setPrices({ min: 0, max: 500 });
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFilters();
  }, []);

  /* --- navigate to shop page when filters change --- */
  useEffect(() => {
    if (location.search) {
      navigate(`/cars${location.search}`);
    }
  }, [location.search]);

  /* ===Handlers=== */
  /* handle filters */
  function handleFilterChange(key, value, func, isSingleValue) {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      
      switch (func) {
        /* add a filter with a key and value */
        case "add-value":
          if (isSingleValue) {
            newParams.set(key, value); // set key-value pair
          } else {
            newParams.append(key, value); // <-- append key-value pair
          }
          break;
        /* delete a filter with that key and value */
        case "delete-value": {
          const allValues = newParams.getAll(key);
          newParams.delete(key);
          for (const remainingValue of allValues.filter(
            (item) => item !== value
          )) {
            newParams.append(key, remainingValue);
          }
          break;
        }
        /* delete all filters with that key*/
        case "delete-key":
          newParams.delete(key);
          break;
        /* delete all filters*/
        case "delete-all":
          newParams.forEach((value, key) => {
            newParams.delete(key);
          });
          break;
      }

      return newParams;
    });
  }

  /* ---Skeleton Loading--- */
  if (loading) {
    return <SkeletonFilters />;
  }

  return (
    <>
      <div className="relative py-10 lg:py-0">
        {/* close button */}
        <div
          className={`${
            !showMobileFilters && "lg:hidden"
          }  absolute right-0 top-0 p-3 cursor-pointer`}
          onClick={() => setShowMobileFilters(false)}
        >
          <CloseIcon />
        </div>
        
        {/* ---Category--- */}
        <div>
          <h3 className="text-xs text-secondary-300 tracking-widest">CATEGORY</h3>
          {/* checkboxes */}
          <ul className="flex flex-col gap-4 text-xl my-5">
            {categories.map((category, index) => {
              return (
                <Checkbox
                  id={index}
                  key={index}
                  label={category._id}
                  count={category.count}
                  param="category"
                  onChange={handleFilterChange}
                />
              );
            })}
          </ul>
        </div>
        
        {/* ---Make--- */}
        <div>
          <h3 className="text-xs text-secondary-300 tracking-widest">MAKE</h3>
          {/* checkboxes */}
          <ul className="flex flex-col gap-4 text-xl my-5">
            {makes.map((make, index) => {
              return (
                <Checkbox
                  id={index}
                  key={index}
                  label={make._id}
                  count={make.count}
                  param="make"
                  onChange={handleFilterChange}
                />
              );
            })}
          </ul>
        </div>
        
        {/* ---Price--- */}
        <div>
          <h3 className="text-xs text-secondary-300 tracking-widest">PRICE PER DAY</h3>
          <div className="my-5 mb-10">
            <RangeInput
              min={prices.min}
              max={prices.max}
              onChange={handleFilterChange}
              param="maxPrice"
            />
          </div>
        </div>

        {/* ---Sort--- */}
        <div>
          <h3 className="text-xs text-secondary-300 tracking-widest">SORT BY</h3>
          <div className="my-5 mb-10">
            <select
              className="w-full p-2 border border-gray-300 rounded"
              value={searchParams.get("sort") || "rating"}
              onChange={(e) => handleFilterChange("sort", e.target.value, "add-value", true)}
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
            </select>
          </div>
        </div>

        {/* ---Remove all filters--- */}
        {location.search ? (
          <div>
            <button
              className="dark:text-slate-200 bg-primary-500 p-3 rounded-[10px] text-white"
              onClick={() => handleFilterChange(null, null, "delete-all", null)}
            >
              Reset Filters
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FilterSidebar;