import PickDrop from "src/components/PickDrop/PickDrop";
import AllCarsList from "src/components/AllCarsList/AllCarsList";
import { useOutletContext } from "react-router";
const RentalCars = () => {
  const [showMobileFilters, setShowMobileFilters] = useOutletContext();
  /* ---handlers--- */
  const handleShowFilters = () => {
    setShowMobileFilters(true);
  };
  return (
    <>
      <PickDrop />
      <div className="flex justify-end gap-2">
        <button className="hidden border border-primary-500 text-primary-500 py-2 px-4 rounded-[10px]">
          sort
        </button>
        <button
          className="border border-primary-500 text-primary-500 py-2 px-4 rounded-[10px] lg:hidden"
          onClick={handleShowFilters}
        >
          Filters
        </button>
      </div>

      <div>
        <AllCarsList />
      </div>
    </>
  );
};

export default RentalCars;
