import { Outlet } from "react-router-dom";
import FilterSidebar from "../../components/FilterSideBar/FilterSideBar";

const Cars = () => {
  return (
    <div className="flex relative">
      <div className="hidden md:block bg-white p-5 px-10 w-[20%]">
        <FilterSidebar />
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Cars;
