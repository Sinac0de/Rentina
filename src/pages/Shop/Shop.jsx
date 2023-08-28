import PickDrop from "../../components/PickDrop/PickDrop";

const Shop = () => {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/4 bg-white">FilterSidebar</div>
      <div className="flex-1 overflow-y-auto px-5">
        <PickDrop />
        <div>Shop Items</div>
        <div></div>
      </div>
    </div>
  );
};

export default Shop;
