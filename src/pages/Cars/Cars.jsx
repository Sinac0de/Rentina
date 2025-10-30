import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import FilterSidebar from "src/components/FilterSideBar/FilterSideBar";

const Cars = () => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Add a useEffect to set body overflow when the navbar opens
  useEffect(() => {
    if (showMobileFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup: Reset the body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileFilters]);

  return (
    <div className="flex relative min-h-screen">
      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setShowMobileFilters(false)}
        ></div>
      )}

      {/* Filter Sidebar */}
      <div
        className={`fixed lg:sticky lg:top-24 inset-y-0 left-0 z-10 w-80 h-full bg-white dark:bg-slate-900 transform transition-transform duration-300 ease-in-out ${
          showMobileFilters ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:transform-none lg:block lg:w-80 lg:min-w-[20rem] h-screen lg:h-[calc(100vh-1rem)] overflow-hidden border-r border-gray-200 dark:border-gray-700`}
      >
        <FilterSidebar setShowMobileFilters={setShowMobileFilters} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet context={[showMobileFilters, setShowMobileFilters]} />
      </div>
    </div>
  );
};

export default Cars;
