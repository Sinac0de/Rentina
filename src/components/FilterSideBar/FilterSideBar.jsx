import Checkbox from "../common/Checkbox";
import RangeInput from "../common/RangeInput";

const FilterSidebar = () => {
  // fake data
  const types = [
    {
      id: 1,
      type: "Sport",
      count: 10,
    },
    {
      id: 2,
      type: "SUV",
      count: 12,
    },
    {
      id: 3,
      type: "MPV",
      count: 16,
    },
    {
      id: 4,
      type: "Sedan",
      count: 20,
    },
    {
      id: 5,
      type: "Coupe",
      count: 14,
    },
    {
      id: 6,
      type: "Hatchback",
      count: 14,
    },
  ];

  return (
    <>
      <div>
        <h3 className="text-xs text-secondary-300 tracking-widest">TYPE</h3>
        {/* checkboxes */}
        <ul className="flex flex-col gap-4 text-xl my-5 mb-10">
          {types.map((type) => {
            return (
              <Checkbox
                id={type.id}
                key={type.id}
                type={type.type}
                count={type.count}
              />
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="text-xs text-secondary-300 tracking-widest">CAPACITY</h3>
        {/* checkboxes */}
        <ul className="flex flex-col gap-4 text-xl my-5 mb-10">
          {types.map((type) => {
            return (
              <Checkbox
                id={type.id}
                key={type.id}
                type={type.type}
                count={type.count}
              />
            );
          })}
        </ul>
      </div>
      <div>
        <h3 className="text-xs text-secondary-300 tracking-widest">PRICE</h3>
        <div className="my-5 mb-10">
          <RangeInput />
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
