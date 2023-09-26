import { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";
import { getCars } from "src/services/api";
import { Link } from "react-router-dom";
import SkeletonCard from "../CarCard/SkeletonCard";

const AllCarsList = ({ isCompact, hasHeader, header }) => {
  const [cars, setCars] = useState([]);
  const [carsCount, setCarsCount] = useState(0);

  useEffect(() => {
    // fetch all cars
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
        {cars.map((car) => {
          return <CarCard key={car.id} carData={car} />;
        })}
      </div>
      {isCompact && (
        <footer className="flex justify-center items-center relative mt-10">
          <Link
            to="/shop"
            className="bg-primary-500 text-white py-2 px-[20px] rounded-[4px] text-xs font-medium"
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
