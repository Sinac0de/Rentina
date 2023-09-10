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
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-secondary-500">Rental Info</h3>
          <h5 className="text-secondary-300 text-xs font-medium">
            Please select your rental date
          </h5>
        </div>
        <h4 className="text-secondary-300 text-xs font-medium mt-1">
          Step 2 of 4
        </h4>
      </div>
      {/* body */}
      <div>
        {/*---Pick-Up---*/}
        <div>
          <BigSelectInput
            label="Locations"
            id="pick-location"
            options={options}
            borderDir="right"
          />
        </div>
        {/*---Drop-Off---*/}
        <div></div>
      </div>
    </div>
  );
};

export default RentalInfo;
