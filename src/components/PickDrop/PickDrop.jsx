import PickDropIcon from "../Icons/PickDropIcon";
import BulletIcon from "../Icons/BulletIcon";
import SmSelectInput from "../common/SmSelectInput";
import DatePickerInput from "../common/DatePickerInput";
import TimeInput from "../common/TimeInput";

const PickDrop = () => {
  // ! Just for test
  const options = [
    { id: 1, name: "Tehran", value: "tehran" },
    { id: 2, name: "Kermanshah", value: "kermanshah" },
    { id: 3, name: "Hamedan", value: "hamedan" },
  ];
  return (
    <div className="flex flex-col lg:flex-row md:items-center md:justify-between gap-1 lg:gap-6 items-center my-6 relative lg:max-w-6xl lg:mx-auto">
      {/* Pick Up */}
      <div className="flex flex-col justify-between w-full sm:h-32 bg-white rounded-lg z-[10] p-3 gap-3 lg:max-w-lg">
        <div className="flex items-center gap-3">
          <BulletIcon />
          <h3 className="font-semibold">Pick-Up</h3>
        </div>
        {/* select inputs */}
        <div className="flex gap-2 lg:gap-1 justify-between relative flex-wrap sm:flex-nowrap">
          <SmSelectInput
            label="Locations"
            id="pick-location"
            options={options}
            borderDir="right"
          />
          <DatePickerInput
            isCompact={true}
            id="pick-date"
            title="Pick-Up Date"
          />
          <TimeInput label="Time" id="pick-time" borderDir="left" />
        </div>
      </div>

      <button className="bg-primary-500 rounded-lg w-fit p-4 relative lg:absolute top-[43%] md:top-[30%] md:left-0 md:right-0 md:mx-auto z-10">
        <PickDropIcon />
        <div className="bg-primary-500/40 w-full h-full rounded-lg p-4 absolute z-[-1] right-0 bottom-0 blur-md"></div>
      </button>

      {/* Drop off*/}
      <div className="flex flex-col justify-between w-full sm:h-32 bg-white rounded-lg z-[1] p-3 gap-3 lg:max-w-lg">
        <div className="flex items-center gap-3">
          <BulletIcon />
          <h3 className="font-semibold">Drop-Off</h3>
        </div>
        {/* select inputs */}
        <div className="flex gap-2 lg:gap-1 justify-between relative flex-wrap sm:flex-nowrap">
          <SmSelectInput
            label="Locations"
            id="drop-location"
            options={options}
            borderDir="right"
          />
          <DatePickerInput
            isCompact={true}
            id="drop-date"
            title="Drop-Off Date"
          />
          <TimeInput label="Time" id="drop-time" borderDir="left" />
        </div>
      </div>
    </div>
  );
};

export default PickDrop;
