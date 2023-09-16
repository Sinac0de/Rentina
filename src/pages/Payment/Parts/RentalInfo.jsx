import BulletIcon from "src/components/Icons/BulletIcon";
import BigSelectInput from "src/components/common/BigSelectInput";

const RentalInfo = () => {
  // ! Just for test
  const options = [
    { id: 1, name: "Mer", value: "mercedes" },
    { id: 2, name: "Pur", value: "pur" },
    { id: 3, name: "Lam", value: "lambo" },
  ];

  return (
    <div className="bg-white w-full overflow-hidden p-5 rounded-[10px] flex flex-col gap-5">
      {/* header */}
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-secondary-500">Rental Info</h3>
          <h4 className="text-secondary-300 text-xs font-medium">
            Step 2 of 4
          </h4>
        </div>
        <h5 className="text-secondary-300 text-xs font-medium">
          Please select your rental date
        </h5>
      </div>
      {/* body */}
      <div className="flex flex-col gap-5">
        {/*---Pick-Up---*/}
        <div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BulletIcon />
              <h3 className="font-semibold">Pick-Up</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <BigSelectInput
              label="Locations"
              id="pick-location"
              options={options}
            />
            <BigSelectInput label="Date" id="pick-date" options={options} />
            <BigSelectInput label="Time" id="pick-time" options={options} />
          </div>
        </div>
        {/*---Drop-Off---*/}
        <div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BulletIcon />
              <h3 className="font-semibold">Drop-Off</h3>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <BigSelectInput
              label="Locations"
              id="drop-location"
              options={options}
            />
            <BigSelectInput label="Date" id="drop-date" options={options} />
            <BigSelectInput label="Time" id="drop-time" options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalInfo;
