import { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";
import { getCars } from "src/services/api";
import { Link, useSearchParams } from "react-router-dom";
import SkeletonCard from "../CarCard/SkeletonCard";
import {
  calTotalPrice,
  getAllParamsFilters,
  scrollToTopFunction,
} from "src/utils/usefulFunctions";

const AllCarsList = ({ isCompact, hasHeader, header }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [carsCount, setCarsCount] = useState(0);

  const filters = getAllParamsFilters();

  /* === UseEffects === */
  /*--- fetch all cars ---*/
  useEffect(() => {
    async function fetchCars() {
      const data = await getCars();
      if (isCompact) {
        setCars(data.slice(0, 8));
      } else {
        setCars(data);
      }
      setCarsCount(data.length);
    }
    fetchCars();
  }, []);

  /* scroll to top when filters change */
  useEffect(() => {
    scrollToTopFunction();
  }, [searchParams]);

  /* ---Filter the cars based on the filters--- */
  const displayedCars = cars.filter((car) => {
    // Filter by type
    if (filters.types.length > 0 && !filters.types.includes(car.specs.type)) {
      return false;
    }

    // Filter by seats
    if (filters.seats.length > 0 && !filters.seats.includes(car.specs.seats)) {
      return false;
    }

    // Filter by maxPrice
    /* calculate total price of the car with discount */
    const carTotalPrice = calTotalPrice(
      car.specs.rental_price,
      car.specs.discount_percent
    );
    if (filters.maxPrice && carTotalPrice > filters.maxPrice) {
      return false;
    }

    // If all filters pass, include the car
    return true;
  });

  /*--- Skeleton loading ---*/
  if (!carsCount) {
    return (
      <div className="md:my-7 md:mb-14">
        <header className={`${!hasHeader ? "hidden" : ""}`}>
          <h3 className="text-secondary-300 font-semibold text-sm md:text-base md:px-2">
            {header}
          </h3>
        </header>
        {/* recommended car cards */}
        <div className="grid grid-flow-row gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 my-5">
          {/* 8 cards skeleton */}
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="md:my-7 md:mb-14">
      <header className={`${!hasHeader ? "hidden" : ""}`}>
        <h3 className="text-secondary-300 font-semibold text-sm md:text-base md:px-2">
          {header}
        </h3>
      </header>
      {/* recommended car cards */}
      <div className="grid grid-flow-row gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 my-5">
        {displayedCars.map((car) => {
          return <CarCard key={car.id} carData={car} />;
        })}
        {!displayedCars.length ? (
          <h4>No cars found! please change filters.</h4>
        ) : (
          ""
        )}
      </div>
      {isCompact && (
        <footer className="flex justify-center items-center relative mt-10">
          <Link
            to="/shop"
            className="bg-primary-500 text-white border-2 hover:text-primary-500 hover:bg-white hover:border-primary-500 transition-all duration-300 py-3 px-[20px] rounded-[4px] text-xs font-medium lg:text-base"
          >
            Show More Cars
          </Link>
          <h3 className="font-bold text-secondary-300 absolute text-sm right-5">
            {carsCount} cars
          </h3>
        </footer>
      )}
    </div>
  );
};

export default AllCarsList;
