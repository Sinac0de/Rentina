import PickDropIcon from "../Icons/PickDropIcon";
import BulletIcon from "../Icons/BulletIcon";
import SelectInput from "../common/SelectInput";

const PickDrop = () => {
  const options = [
    { id: 1, name: "Mer", value: "mercedes" },
    { id: 2, name: "Pur", value: "pur" },
    { id: 3, name: "Lam", value: "lambo" },
  ];
  return (
    <div className="flex flex-col gap-6 items-center my-5 relative">
      {/* Pick Up */}
      <div className="flex flex-col justify-between w-full h-32 bg-white rounded-lg z-[1] p-3 gap-3">
        <div className="flex items-center gap-3">
          <BulletIcon />
          <h3 className="font-semibold">Pick-Up</h3>
        </div>
        {/* select inputs */}
        <div className="flex gap-1 justify-between relative">
          <SelectInput
            label="Locations"
            id="pick-location"
            options={options}
            borderDir="right"
          />
          <SelectInput
            label="Date"
            id="pick-date"
            options={options}
            borderDir={null}
          />
          <SelectInput
            label="Time"
            id="pick-time"
            options={options}
            borderDir="left"
          />
        </div>
      </div>

      <button className="bg-primary-500 rounded-lg w-fit p-4 absolute top-[40%] z-[999]">
        <PickDropIcon />
        <div className="bg-primary-500/40 w-full h-full rounded-lg p-4 absolute z-[-1] right-0 bottom-0 blur-md"></div>
      </button>

      {/* Drop off*/}

      <div className="w-full h-36 bg-white rounded-lg -z-10">Drop off</div>
    </div>
  );
};

export default PickDrop;
