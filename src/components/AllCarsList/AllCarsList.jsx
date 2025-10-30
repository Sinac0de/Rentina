import { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";
import { getCars } from "src/services/api";
import { Link, useSearchParams } from "react-router";
import SkeletonCard from "../CarCard/SkeletonCard";
import { scrollToTopFunction } from "src/utils/utils";
import Pagination from "../Pagination/Pagination";
import { ArrowRightIcon, MoveRight } from "lucide-react";

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
            params[key] = value;
          }
        }

        // Add sort parameter if not present
        if (!params.sort) {
          params.sort = "rating"; // Default sort by rating
        }

        const data = await getCars(params);

        if (isCompact) {
          setCars(data.cars || []);
        } else {
          setCars(data.cars || []);
        }

        setTotalCars(data.total || 0);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch cars");
        setLoading(false);
      }
    }

    fetchCars();
  }, [searchParams, currentPage, pageSize, isCompact]);

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
      <div className="lg:my-7 lg:mb-14">
        <header className={`${!hasHeader ? "hidden" : ""}`}>
          <h3 className="text-secondary-300 font-semibold text-sm lg:text-base lg:px-2">
            {header}
          </h3>
        </header>
        {/* recommended car cards */}
        <div className="grid grid-flow-row gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 my-5">
          {/* 8 cards skeleton */}
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
      <div className="lg:my-7 lg:mb-14">
        <div className="flex flex-col items-center gap-1 mt-10 w-full text-base lg:text-xl">
          <h4 className="text-red-500">Error: {error}</h4>
          <button
            className="underline text-primary-500"
            onClick={() => window.location.reload()}
          >
            Retry?
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:my-7 lg:mb-14">
      <header className={`${!hasHeader ? "hidden" : ""}`}>
        <h3 className="text-secondary-300 font-semibold text-sm lg:text-base lg:px-2">
          {header}
        </h3>
      </header>
      {/* recommended car cards */}
      <div className="grid grid-flow-row gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 my-5">
        {cars.map((car) => {
          return <CarCard key={car._id} carData={car} />;
        })}
      </div>
      {/* if there is no car */}
      {!cars.length ? (
        <div className="dark:text-slate-300 flex flex-col items-center gap-1 mt-10 w-full text-base lg:text-xl">
          <h4>No cars found! please change filters.</h4>
          <Link to="/cars" className="underline text-primary-500">
            Reset filters?
          </Link>
        </div>
      ) : null}
      {/* --- footer --- */}
      <footer className="flex justify-center items-center relative my-10">
        {isCompact ? (
          <>
            <Link
              to="/cars"
              className="flex gap-1 items-center justify-center rounded-2xl dark:border-primary-500 dark:hover:bg-transparent dark:text-slate-300 bg-primary-500 text-white border-2 hover:text-primary-500 hover:bg-white hover:border-primary-500 transition-all duration-300 py-3 px-10 w-1/3 text-xs font-medium lg:text-base"
            >
              Show More Cars <ArrowRightIcon className="mt-1 w-4 h-4" />
            </Link>
            <h3 className="font-bold text-secondary-300 absolute text-sm right-5">
              {totalCars} cars
            </h3>
          </>
        ) : (
          <Pagination
            className="flex gap-2 mx-auto p-3"
            currentPage={currentPage}
            totalCount={totalCars}
            pageSize={pageSize}
            onPageChange={(page) => handlePageChange(page)}
          />
        )}
      </footer>
    </div>
  );
};

export default AllCarsList;
