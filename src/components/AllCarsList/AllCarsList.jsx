import CarCard from "../CarCard/CarCard";

const AllCarsList = ({ hasHeader, header }) => {
  return (
    <div className="md:my-7 md:mb-14">
      <header className={`${!hasHeader ? "hidden" : ""}`}>
        <h3>{header}</h3>
      </header>
      {/* recommended car cards */}
      <div className="grid grid-flow-row gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5">
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
        <CarCard />
      </div>
      <footer className="flex justify-center items-center relative">
        <button className="bg-primary-500 py-2 px-[20px] rounded-[4px] text-xs">
          Show More Cars
        </button>
        <h3 className="font-bold text-secondary-300 absolute text-sm right-5">
          120 cars
        </h3>
      </footer>
    </div>
  );
};

export default AllCarsList;
