import AllCarsList from "../../components/AllCarsList/AllCarsList";
import FilterSidebar from "../../components/FilterSideBar/FilterSideBar";
import PickDrop from "../../components/PickDrop/PickDrop";

const Shop = () => {
  return (
    <div className="flex min-h-screen relative">
      <div className="bg-white p-5 px-10 w-[20%] sticky h-full top-0 z-20">
        <FilterSidebar />
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        <PickDrop />
        <div>
          <AllCarsList />
        </div>
      </div>
    </div>
  );
};

export default Shop;
