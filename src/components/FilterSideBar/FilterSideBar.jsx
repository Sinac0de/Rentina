import { Fragment } from "react";

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
    <div className="h-full w-full fixed bg-white z-50 p-5">
      <div>
        <h3>TYPE</h3>
        {/* checkboxes */}
        <ul className="flex flex-col mb-4 gap-6 md:gap-8">
          {types.map((type) => {
            return (
              <div key={type.id} className="flex items-center">
                <input
                  id={type.type}
                  type="checkbox"
                  value=""
                  className="w-4 h-4 rounded-lg text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={type.type}
                  className="ml-2 text-sm font-medium text-secondary-400"
                >
                  {type.type}{" "}
                  <span className="text-secondary-300">({type.count})</span>
                </label>
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>CAPACITY</h3>
        {/* checkboxes */}
        <ul className="flex flex-col mb-4 gap-6 md:gap-8">
          {types.map((type) => {
            return (
              <div key={type.id} className="flex items-center">
                <input
                  id={type.type}
                  type="checkbox"
                  value=""
                  className="w-4 h-4 rounded-lg text-blue-600 bg-gray-100 border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor={type.type}
                  className="ml-2 text-sm font-medium text-secondary-400"
                >
                  {type.type}{" "}
                  <span className="text-secondary-300">({type.count})</span>
                </label>
              </div>
            );
          })}
        </ul>
      </div>
      <div>
        <h3>PRICE</h3>
        <div>
          <input type="range" max={100} />
          <h2>Max. $100.00</h2>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
