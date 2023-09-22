import { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";
import { getCars } from "src/services/api";

const AllCarsList = ({ hasHeader, header }) => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    // fetch all cars
    async function fetchCars() {
      setCars(await getCars());
    }
    fetchCars();
  }, []);

  if (!cars.length) {
    return <h2>getting cars info...</h2>;
  }

  return (
    <div className="md:my-7 md:mb-14">
      <header className={`${!hasHeader ? "hidden" : ""}`}>
        <h3 className="text-secondary-300 font-semibold text-sm md:text-base md:px-2">
          {header}
        </h3>
      </header>
      {/* recommended car cards */}
      <div className="grid grid-flow-row gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5">
        {cars.map((car) => {
          return <CarCard key={car.id} carData={car} />;
        })}
      </div>
      <footer className="flex justify-center items-center relative">
        <button className="bg-primary-500 py-2 px-[20px] rounded-[4px] text-xs">
          Show More Cars
        </button>
        <h3 className="font-bold text-secondary-300 absolute text-sm right-5">
          {cars.length} cars
        </h3>
      </footer>
    </div>
  );
};

export default AllCarsList;
