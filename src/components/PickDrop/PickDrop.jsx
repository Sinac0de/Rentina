import PickDropIcon from "../Icons/PickDropIcon";
import BulletIcon from "../Icons/BulletIcon";
import SmSelectInput from "../common/SmSelectInput";

const PickDrop = () => {
  // ! Just for test
  const options = [
    { id: 1, name: "Mer", value: "mercedes" },
    { id: 2, name: "Pur", value: "pur" },
    { id: 3, name: "Lam", value: "lambo" },
  ];
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 items-center my-6 relative">
      {/* Pick Up */}
      <div className="flex flex-col justify-between w-full h-32 bg-white rounded-lg z-[1] p-3 gap-3 max-w-lg">
        <div className="flex items-center gap-3">
          <BulletIcon />
          <h3 className="font-semibold">Pick-Up</h3>
        </div>
        {/* select inputs */}
        <div className="flex gap-1 justify-between relative">
          <SmSelectInput
            label="Locations"
            id="pick-location"
            options={options}
            borderDir="right"
          />
          <SmSelectInput
            label="Date"
            id="pick-date"
            options={options}
            borderDir={null}
          />
          <SmSelectInput
            label="Time"
            id="pick-time"
            options={options}
            borderDir="left"
          />
        </div>
      </div>

      <button className="bg-primary-500 rounded-lg w-fit p-4 absolute top-[43%] md:top-[30%] md:left-0 md:right-0 md:mx-auto z-10">
        <PickDropIcon />
        <div className="bg-primary-500/40 w-full h-full rounded-lg p-4 absolute z-[-1] right-0 bottom-0 blur-md"></div>
      </button>

      {/* Drop off*/}
      <div className="flex flex-col justify-between w-full h-32 bg-white rounded-lg z-[1] p-3 gap-3 max-w-lg">
        <div className="flex items-center gap-3">
          <BulletIcon />
          <h3 className="font-semibold">Drop-Off</h3>
        </div>
        {/* select inputs */}
        <div className="flex gap-1 justify-between relative">
          <SmSelectInput
            label="Locations"
            id="drop-location"
            options={options}
            borderDir="right"
          />
          <SmSelectInput
            label="Date"
            id="drop-date"
            options={options}
            borderDir={null}
          />
          <SmSelectInput
            label="Time"
            id="drop-time"
            options={options}
            borderDir="left"
          />
        </div>
      </div>
    </div>
  );
};

export default PickDrop;
