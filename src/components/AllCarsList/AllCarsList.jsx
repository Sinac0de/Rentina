import { ArrowRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getCars } from "src/services/api";
import { scrollToTopFunction } from "src/utils/utils";
import CarCard from "../CarCard/CarCard";
import SkeletonCard from "../CarCard/SkeletonCard";
import Pagination from "../Pagination/Pagination";

const AllCarsList = ({ isCompact, hasHeader, header }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCars, setTotalCars] = useState(0);

  // Get page from URL or default to 1
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const pageSize = isCompact ? 8 : 12;

  /* === UseEffects === */
  /*--- fetch all cars with pagination and filters ---*/
  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      setError(null);

      try {
        // Build params object from search params
        const params = {};

        // Add pagination
        params.page = currentPage;
        params.pageSize = pageSize;

        // Add filters from search params
        for (let [key, value] of searchParams.entries()) {
          // Skip page parameter as we handle it separately
          if (key !== "page") {
            // Handle multiple values for the same key
            const allValues = searchParams.getAll(key);
            if (allValues.length > 1) {
              // If there are multiple values, send them as an array
              params[key] = allValues;
            } else {
              // Single value
              params[key] = value;
            }
          }
        }

        // Add sort parameter if not present
        if (!params.sort) {
          params.sort = "rating"; // Default sort by rating
        }

        const data = await getCars(params);

        setCars(data.cars || []);
        setTotalCars(data.total || 0);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setError(err.message || "Failed to fetch cars");
        setLoading(false);
      }
    }

    fetchCars();
  }, [searchParams, currentPage, pageSize]);

  /* scroll to top when filters change */
  useEffect(() => {
    scrollToTopFunction();
  }, [searchParams, currentPage]);

  const handlePageChange = (page) => {
    setSearchParams((prevParams) => {
      if (page === 1) {
        prevParams.delete("page");
      } else {
        prevParams.set("page", page);
      }
      return prevParams;
    });
  };

  /*--- Skeleton loading ---*/
  if (loading) {
    return (
      <div
        className={`${isCompact ? "bg-white rounded-xl shadow-sm p-6" : ""}`}
      >
        <header
          className={`${
            !hasHeader ? "hidden" : ""
          } flex justify-between items-center mb-6`}
        >
          <h3 className="text-gray-800 font-semibold text-lg">{header}</h3>
        </header>
        {/* car cards */}
        <div className="grid grid-flow-row gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: pageSize }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div
        className={`${isCompact ? "bg-white rounded-xl shadow-sm p-6" : ""}`}
      >
        <div className="flex flex-col items-center gap-1 mt-10 w-full text-base lg:text-xl">
          <h4 className="text-red-500 text-lg font-medium">Error: {error}</h4>
          <button
            className="underline text-primary-500 hover:text-primary-600 mt-2"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`${isCompact ? "bg-white rounded-xl shadow-sm p-6" : ""}`}>
      <header
        className={`${
          !hasHeader ? "hidden" : ""
        } flex justify-between items-center mb-6`}
      >
        <h3 className="text-gray-800 font-semibold text-lg">
          {header || "Available Cars"}
        </h3>
      </header>

      {/* car cards */}
      <div className="grid grid-flow-row gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {cars.map((car) => {
          return <CarCard key={car._id} carData={car} />;
        })}
      </div>

      {/* if there is no car */}
      {!cars.length ? (
        <div className="flex flex-col items-center gap-1 mt-10 w-full text-base lg:text-xl">
          <h4 className="text-lg font-medium text-gray-700">No cars found</h4>
          <p className="text-gray-500 mb-4 text-center">
            Try adjusting your filters or search criteria
          </p>
          {Array.from(searchParams.keys()).some((key) => key !== "page") && (
            <button
              className="underline text-primary-500 hover:text-primary-600"
              onClick={() => {
                // Keep only the page parameter
                const newParams = new URLSearchParams();
                if (searchParams.get("page")) {
                  newParams.set("page", searchParams.get("page"));
                }
                setSearchParams(newParams);
              }}
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : null}

      {/* --- footer --- */}
      <footer className="flex justify-center items-center relative mt-10">
        {isCompact ? (
          <div className="flex justify-between items-center w-full">
            <h3 className="font-bold text-secondary-300 text-sm">
              {totalCars} cars
            </h3>
            <Link
              to="/cars"
              className="flex gap-1 items-center justify-center rounded-2xl bg-primary-500 text-white border-2 hover:text-primary-500 hover:bg-white hover:border-primary-500 transition-all duration-300 py-3 px-6 text-xs font-medium lg:text-base"
            >
              Show More Cars <ArrowRightIcon className="mt-1 w-4 h-4" />
            </Link>
          </div>
        ) : (
          totalCars > 0 && (
            <Pagination
              className="flex gap-2 mx-auto p-3"
              currentPage={currentPage}
              totalCount={totalCars}
              pageSize={pageSize}
              onPageChange={(page) => handlePageChange(page)}
            />
          )
        )}
      </footer>
    </div>
  );
};

export default AllCarsList;
