import PickDropIcon from "../../assets/Icons/PickDropIcon";
import SmSelectInput from "../common/SmSelectInput";
import DatePickerInput from "../common/DatePickerInput";
import TimeInput from "../common/TimeInput";
import PickUpIcon from "src/assets/Icons/PickUpIcon";
import DropOffIcon from "src/assets/Icons/DropOffIcon";

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
      <div className="dark:bg-slate-700 flex flex-col justify-between w-full sm:h-28 bg-white rounded-lg z-[10] p-3 gap-3 lg:max-w-lg shadow-sm">
        <div className="dark:text-slate-300 flex items-center gap-3">
          <PickUpIcon color={"#3563E9"} />
          <h3 className="font-semibold">Pick-Up</h3>
        </div>
        {/* select inputs */}
        <div className="flex gap-2 lg:gap-1 justify-between relative flex-wrap sm:flex-nowrap">
          <SmSelectInput
            label="Locations"
            id="pick-location"
            options={options}
          />
          <DatePickerInput id="pick-date" label="Date" isCompact />
          <TimeInput label="Time" id="pick-time" isCompact={true} />
        </div>
      </div>

      <button className="dark:text-slate-500 bg-primary-500 rounded-xl w-fit p-4 relative lg:absolute top-[43%] md:top-[30%] md:left-0 md:right-0 md:mx-auto z-10">
        <PickDropIcon color={"white"} />
        <div className="bg-primary-500/40 w-full h-full rounded-xl p-4 absolute z-[-1] right-0 bottom-0 blur-md"></div>
      </button>

      {/* Drop off*/}
      <div className="dark:bg-slate-700 flex flex-col justify-between w-full sm:h-28 bg-white rounded-lg z-[1] p-3 gap-3 lg:max-w-lg shadow-sm">
        <div className="dark:text-slate-300 flex items-center gap-3">
          <DropOffIcon color={"#3563E9"} />
          <h3 className="font-semibold">Drop-Off</h3>
        </div>
        {/* select inputs */}
        <div className="flex gap-2 lg:gap-1 justify-between relative flex-wrap sm:flex-nowrap">
          <SmSelectInput
            label="Locations"
            id="drop-location"
            options={options}
          />
          <DatePickerInput isCompact={true} label="Date" id="drop-date" />
          <TimeInput label="Time" id="drop-time" isCompact={true} />
        </div>
      </div>
    </div>
  );
};

export default PickDrop;
