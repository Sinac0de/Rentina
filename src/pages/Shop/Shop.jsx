import FilterSidebar from "../../components/FilterSideBar/FilterSideBar";
import PickDrop from "../../components/PickDrop/PickDrop";

const Shop = () => {
  return (
    <div className="flex min-h-screen">
      <div className="bg-white p-5 px-10 w-[20%]">
        <FilterSidebar />
      </div>
      <div className="flex-1 overflow-y-auto px-5">
        <PickDrop />
        <div>Shop Items</div>
        <div></div>
      </div>
    </div>
  );
};

export default Shop;
