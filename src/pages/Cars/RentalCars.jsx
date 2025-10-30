import { useState, useEffect } from "react";
import { SearchIcon, FilterIcon } from "lucide-react";
import { useOutletContext, useSearchParams } from "react-router";
import AllCarsList from "src/components/AllCarsList/AllCarsList";

const RentalCars = () => {
  const [showMobileFilters, setShowMobileFilters] = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

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

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="flex flex-col gap-2 p-5">
      {/* Search and Sort Section */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by make, model..."
              className="w-full pl-10 pr-10 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Sort Select */}
          <div className="w-full md:w-64">
            <select
              value={searchParams.get("sort") || "rating"}
              onChange={(e) => {
                setSearchParams((prev) => {
                  const newParams = new URLSearchParams(prev);
                  newParams.set("sort", e.target.value);
                  newParams.set("page", "1"); // Reset to first page when sort changes
                  return newParams;
                });
              }}
              className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition appearance-none bg-white"
            >
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="year-new">Year: Newest First</option>
              <option value="year-old">Year: Oldest First</option>
            </select>
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
