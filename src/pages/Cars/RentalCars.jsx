import { useState, useEffect } from "react";
import { SearchIcon, FilterIcon, X } from "lucide-react";
import { useOutletContext, useSearchParams } from "react-router";
import AllCarsList from "src/components/AllCarsList/AllCarsList";
import { Input, Option, Select } from "@material-tailwind/react";

const RentalCars = () => {
  const [, setShowMobileFilters] = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [sortValue, setSortValue] = useState(
    searchParams.get("sort") || "rating"
  );

  // Update sortValue when searchParams change
  useEffect(() => {
    setSortValue(searchParams.get("sort") || "rating");
  }, [searchParams]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("search", searchQuery);
          newParams.set("page", "1"); // Reset to first page when search changes
          return newParams;
        });
      } else if (searchParams.has("search")) {
        setSearchParams((prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.delete("search");
          newParams.set("page", "1");
          return newParams;
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, setSearchParams, searchParams]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (val) => {
    setSortValue(val);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", val);
      newParams.set("page", "1"); // Reset to first page when sort changes
      return newParams;
    });
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-2 p-5">
      {/* Search and Sort Section */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Input
              type="text"
              label="Search by make, model..."
              value={searchQuery}
              onChange={handleSearchChange}
              size="lg"
              icon={<SearchIcon size={20} />}
              color="orange"
              className="dark:focus:!text-white dark:!text-white"
              labelProps={{
                className: "dark:!text-white",
              }}
              containerProps={{
                className: "dark:focus-within:!border-orange-500",
              }}
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Sort Select */}
          <div className="w-full md:w-72">
            <Select
              label="Sort By"
              value={sortValue}
              onChange={handleSortChange}
              size="lg"
              color="orange"
              className="dark:focus:!text-white dark:!text-white"
              labelProps={{
                className: "dark:!text-white",
              }}
              menuProps={{
                className: "dark:bg-slate-800 dark:border-slate-700",
              }}
            >
              <Option
                className="dark:hover:!bg-slate-700 dark:focus:!bg-slate-700"
                value="rating"
              >
                Highest Rated
              </Option>
              <Option
                className="dark:hover:!bg-slate-700 dark:focus:!bg-slate-700"
                value="price-low"
              >
                Price: Low to High
              </Option>
              <Option
                className="dark:hover:!bg-slate-700 dark:focus:!bg-slate-700"
                value="price-high"
              >
                Price: High to Low
              </Option>
              <Option
                className="dark:hover:!bg-slate-700 dark:focus:!bg-slate-700"
                value="year-new"
              >
                Year: Newest First
              </Option>
              <Option
                className="dark:hover:!bg-slate-700 dark:focus:!bg-slate-700"
                value="year-old"
              >
                Year: Oldest First
              </Option>
              <Option
                className="dark:hover:!bg-slate-700 dark:focus:!bg-slate-700"
                value="newest"
              >
                Newest Added
              </Option>
            </Select>
          </div>
        </div>
      </div>

      {/* Filters Button (Mobile) and Results Header */}
      <div className="flex justify-between items-center">
        <button
          className="flex items-center gap-2 border border-primary-500 text-primary-500 py-2 px-4 rounded-lg lg:hidden hover:bg-primary-50 transition-colors"
          onClick={() => setShowMobileFilters(true)}
        >
          <FilterIcon size={18} />
          Filters
        </button>
      </div>

      {/* Results */}
      <div className="flex-1">
        <AllCarsList />
      </div>
    </div>
  );
};

export default RentalCars;
