import "./FilterSidebar.css";
import { useState, useEffect } from "react";
import { getCarCategories, getCarMakes } from "src/services/api";
import SkeletonFilters from "./SkeletonFilters";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import { ChevronDown, X } from "lucide-react";
import { Slider } from "src/components/ui/slider"; // Import the shadcn/ui Slider component

// Accordion component similar to shadcn/ui
const Accordion = ({ title, isOpen, onToggle, children, className = "" }) => {
  return (
    <div
      className={`border-b border-slate-200 dark:border-slate-700 pb-4 ${className}`}
    >
      <button
        className="flex justify-between items-center w-full py-3 text-left group"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <h3 className="font-semibold text-gray-800 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {title}
        </h3>
        <ChevronDown
          size={20}
          className={`text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isOpen && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

const FilterSidebar = ({ setShowMobileFilters }) => {
  /**=== Hooks ===**/
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  /* --- Filter Data --- */
  const [categories, setCategories] = useState([]);
  const [makes, setMakes] = useState([]);
  const [prices, setPrices] = useState({ min: 0, max: 500 });
  const [loading, setLoading] = useState(true);

  // Accordion states
  const [openSections, setOpenSections] = useState({
    category: true,
    make: true,
    price: true,
    specs: true,
    sort: true,
  });

  // State for slider values
  const [sliderValues, setSliderValues] = useState([0, 500]);

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
  }, [location.search, navigate]);

  // Effect to sync slider values with URL parameters
  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    setSliderValues([
      minPrice ? Number(minPrice) : prices.min,
      maxPrice ? Number(maxPrice) : prices.max,
    ]);
  }, [searchParams, prices.min, prices.max]);

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
        case "delete-all": {
          // Keep only the page parameter
          const page = newParams.get("page");
          // Get all keys first, then delete them to avoid iteration issues
          const keysToDelete = Array.from(newParams.keys()).filter(
            (key) => key !== "page"
          );
          keysToDelete.forEach((key) => {
            newParams.delete(key);
          });
          break;
        }
        default:
          break;
      }

      // Reset to first page when filters change
      if (func !== "delete-all") {
        newParams.set("page", "1");
      }

      return newParams;
    });
  }

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const isSelected = (param, value) => {
    return searchParams.getAll(param).includes(value);
  };

  const getPriceRange = () => {
    const min = searchParams.get("minPrice") || "";
    const max = searchParams.get("maxPrice") || "";
    return { min, max };
  };

  // Update handlePriceChange to work with slider
  const handlePriceChange = (values) => {
    setSliderValues(values);

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      // Set min and max price values
      if (values[0] !== 0) {
        newParams.set("minPrice", values[0]);
      } else {
        newParams.delete("minPrice");
      }

      if (values[1] !== 500) {
        newParams.set("maxPrice", values[1]);
      } else {
        newParams.delete("maxPrice");
      }

      newParams.set("page", "1"); // Reset to first page
      return newParams;
    });
  };

  /* ---Skeleton Loading--- */
  if (loading) {
    return (
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 lg:hidden">
          <div className="flex justify-between items-center">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              onClick={() =>
                setShowMobileFilters && setShowMobileFilters(false)
              }
            >
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-1 p-6">
          <SkeletonFilters />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden ">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 lg:hidden">
        <div className="flex justify-between items-center">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            onClick={() => setShowMobileFilters && setShowMobileFilters(false)}
          >
            <X size={24} />
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent scrollbar-thumb-rounded-full">
        <div className="space-y-6">
          {/* Active Filters Summary */}
          {Array.from(searchParams.keys()).filter(
            (key) => key !== "page" && key !== "sort"
          ).length > 0 && (
            <div className="pb-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  Active Filters
                </h3>
                <button
                  className="text-sm text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                  onClick={() =>
                    handleFilterChange(null, null, "delete-all", null)
                  }
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(searchParams.entries())
                  .filter(([key]) => key !== "page" && key !== "sort")
                  .map(([key, value], index) => (
                    <div
                      key={index}
                      className="flex items-center bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full px-3 py-1 text-sm"
                    >
                      <span className="mr-1">
                        {key}:{value}
                      </span>
                      <button
                        onClick={() =>
                          handleFilterChange(key, value, "delete-value", false)
                        }
                        className="text-primary-800 hover:text-primary-900 dark:text-primary-200 dark:hover:text-primary-100"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Category Accordion */}
          <Accordion
            title="Category"
            isOpen={openSections.category}
            onToggle={() => toggleSection("category")}
          >
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {categories.map((category, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`category-${index}`}
                    checked={isSelected("category", category._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleFilterChange(
                          "category",
                          category._id,
                          "add-value",
                          false
                        );
                      } else {
                        handleFilterChange(
                          "category",
                          category._id,
                          "delete-value",
                          false
                        );
                      }
                    }}
                    className="h-4 w-4 text-primary-500 rounded border-slate-300 focus:ring-primary-500 checkbox-input dark:bg-slate-700 dark:border-slate-600"
                  />
                  <label
                    htmlFor={`category-${index}`}
                    className="ml-2 text-gray-700 dark:text-gray-300 flex-1 cursor-pointer"
                  >
                    {category._id}
                  </label>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-slate-100 dark:bg-slate-700 rounded-full px-2 py-1">
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </Accordion>

          {/* Make Accordion */}
          <Accordion
            title="Make"
            isOpen={openSections.make}
            onToggle={() => toggleSection("make")}
          >
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent scrollbar-thumb-rounded-full">
              {makes.map((make, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`make-${index}`}
                    checked={isSelected("make", make._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        handleFilterChange(
                          "make",
                          make._id,
                          "add-value",
                          false
                        );
                      } else {
                        handleFilterChange(
                          "make",
                          make._id,
                          "delete-value",
                          false
                        );
                      }
                    }}
                    className="h-4 w-4 text-primary-500 rounded border-slate-300 focus:ring-primary-500 checkbox-input dark:bg-slate-700 dark:border-slate-600"
                  />
                  <label
                    htmlFor={`make-${index}`}
                    className="ml-2 text-gray-700 dark:text-gray-300 flex-1 cursor-pointer"
                  >
                    {make._id}
                  </label>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-slate-100 dark:bg-slate-700 rounded-full px-2 py-1">
                    {make.count}
                  </span>
                </div>
              ))}
            </div>
          </Accordion>

          {/* Price Range Accordion */}
          <Accordion
            title="Price Per Day"
            isOpen={openSections.price}
            onToggle={() => toggleSection("price")}
          >
            <div className="mt-3 space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-2/5">
                  <label
                    htmlFor="min-price"
                    className="block text-sm text-gray-600 dark:text-gray-400 mb-1"
                  >
                    Min ($)
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    min="0"
                    max={sliderValues[1]}
                    value={sliderValues[0]}
                    onChange={(e) =>
                      handlePriceChange([
                        Number(e.target.value),
                        sliderValues[1],
                      ])
                    }
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-gray-200"
                    placeholder="0"
                  />
                </div>
                <div className="text-gray-400 dark:text-gray-500">-</div>
                <div className="w-2/5">
                  <label
                    htmlFor="max-price"
                    className="block text-sm text-gray-600 dark:text-gray-400 mb-1"
                  >
                    Max ($)
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    min={sliderValues[0]}
                    max={prices.max}
                    value={sliderValues[1]}
                    onChange={(e) =>
                      handlePriceChange([
                        sliderValues[0],
                        Number(e.target.value),
                      ])
                    }
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded focus:ring-primary-500 focus:border-primary-500 dark:bg-slate-700 dark:text-gray-200"
                    placeholder={prices.max.toString()}
                  />
                </div>
              </div>
              <div className="pt-2">
                <Slider
                  min={prices.min}
                  max={prices.max}
                  value={sliderValues}
                  onValueChange={handlePriceChange}
                  minStepsBetweenThumbs={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>${prices.min}</span>
                  <span>${prices.max}</span>
                </div>
              </div>
            </div>
          </Accordion>

          {/* Specifications Accordion */}
          <Accordion
            title="Specifications"
            isOpen={openSections.specs}
            onToggle={() => toggleSection("specs")}
          >
            <div className="mt-3 space-y-4">
              {/* Fuel Type */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Fuel Type
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Petrol", "Diesel", "Electric", "Hybrid"].map(
                    (fuel, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          if (isSelected("fuel", fuel)) {
                            handleFilterChange(
                              "fuel",
                              fuel,
                              "delete-value",
                              false
                            );
                          } else {
                            handleFilterChange(
                              "fuel",
                              fuel,
                              "add-value",
                              false
                            );
                          }
                        }}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          isSelected("fuel", fuel)
                            ? "bg-primary-500 text-white shadow-sm"
                            : "bg-slate-100 text-gray-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                        }`}
                      >
                        {fuel}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Transmission */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transmission
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Manual", "Automatic"].map((transmission, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        if (isSelected("transmission", transmission)) {
                          handleFilterChange(
                            "transmission",
                            transmission,
                            "delete-value",
                            false
                          );
                        } else {
                          handleFilterChange(
                            "transmission",
                            transmission,
                            "add-value",
                            false
                          );
                        }
                      }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        isSelected("transmission", transmission)
                          ? "bg-primary-500 text-white shadow-sm"
                          : "bg-slate-100 text-gray-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {transmission}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Capacity
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[2, 4, 5, 7].map((capacity, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        if (isSelected("capacity", capacity.toString())) {
                          handleFilterChange(
                            "capacity",
                            capacity.toString(),
                            "delete-value",
                            false
                          );
                        } else {
                          handleFilterChange(
                            "capacity",
                            capacity.toString(),
                            "add-value",
                            false
                          );
                        }
                      }}
                      className={`px-3 py-1 text-sm rounded-full transition-colors ${
                        isSelected("capacity", capacity.toString())
                          ? "bg-primary-500 text-white shadow-sm"
                          : "bg-slate-100 text-gray-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-gray-300 dark:hover:bg-slate-600"
                      }`}
                    >
                      {capacity}+ Seats
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
