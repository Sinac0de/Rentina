import PickDrop from "../../components/PickDrop/PickDrop";

const Shop = () => {
  return (
    <div className="flex">
      <div>FilterSidebar</div>
      <div className="flex-1">
        <PickDrop />
        <div>Shop Items</div>
      </div>
    </div>
  );
};

export default Shop;
