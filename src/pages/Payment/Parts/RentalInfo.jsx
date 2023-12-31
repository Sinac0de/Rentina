import BulletIcon from "src/assets/Icons/BulletIcon";
import DropOffIcon from "src/assets/Icons/DropOffIcon";
import PickUpIcon from "src/assets/Icons/PickUpIcon";
import BigSelectInput from "src/components/common/BigSelectInput";
import DatePickerInput from "src/components/common/DatePickerInput";
import TimeInput from "src/components/common/TimeInput";

const RentalInfo = () => {
  // ! Just for test
  const options = [
    { id: 1, name: "Mer", value: "mercedes" },
    { id: 2, name: "Pur", value: "pur" },
    { id: 3, name: "Lam", value: "lambo" },
  ];

  return (
    <div className="dark:bg-slate-600 bg-white w-full p-5 rounded-[10px] flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="dark:text-slate-300 font-bold text-secondary-500 lg:text-xl">
            Rental Info
          </h3>
          <h4 className="text-secondary-300 text-xs font-medium lg:text-sm">
            Step 2 of 4
          </h4>
        </div>
        <h5 className="text-secondary-300 text-xs font-medium lg:text-sm">
          Please select your rental date
        </h5>
      </div>
      {/* body */}
      <div className="flex flex-col gap-5">
        {/*---Pick-Up---*/}
        <div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <PickUpIcon color={"#3563E9"} />
              <h3 className="dark:text-slate-300 font-semibold lg:text-base">
                Pick-Up
              </h3>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 gap-5">
            <BigSelectInput
              label="Locations"
              id="pick-location"
              options={options}
            />
            <DatePickerInput id="pick-date" label="Date" />
            <TimeInput label="Time" id="pick-time" isCompact={false} />
          </div>
        </div>
        {/*---Drop-Off---*/}
        <div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <DropOffIcon color={"#3563E9"} />
              <h3 className="font-semibold lg:text-base">Drop-Off</h3>
            </div>
          </div>
          <div className="lg:grid lg:grid-cols-2 gap-5">
            <BigSelectInput
              label="Locations"
              id="drop-location"
              options={options}
            />
            <DatePickerInput id="drop-date" label="Date" />
            <TimeInput label="Time" id="drop-time" isCompact={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalInfo;
