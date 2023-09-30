import { useState } from "react";
import { Outlet } from "react-router-dom";
import FilterSidebar from "src/components/FilterSideBar/FilterSideBar";

const Cars = () => {
  const [showMobileFilters, setShowMobileFilters] = useState("");
  return (
    <div className="flex relative">
      <div
        className={`dark:bg-slate-700  ${
          showMobileFilters
            ? "fixed top-0 right-0 bottom-0 left-0 z-50 w-full h-full"
            : "hidden"
        } lg:top-auto lg:bottom-auto lg:w-1/8 lg:relative xl:block bg-white p-5 px-10 w-[20%] overflow-y-auto`}
      >
        <FilterSidebar setShowMobileFilters={setShowMobileFilters} />
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        <Outlet context={[showMobileFilters, setShowMobileFilters]} />
      </div>
    </div>
  );
};

export default Cars;
