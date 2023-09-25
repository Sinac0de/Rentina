import Checkbox from "../common/Checkbox";
import RangeInput from "../common/RangeInput";
import { useState, useEffect } from "react";
import { getCarsSpecs } from "src/services/api";
import SkeletonFilters from "./SkeletonFilters";

const FilterSidebar = () => {
  const [types, setTypes] = useState([]);
  const [seats, setSeats] = useState([]);
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const allTypes = [];
    const allSeats = [];
    const allPrices = [];

    /* ---Get All Specs of cars--- */
    async function fetchCarsSpecs() {
      const data = await getCarsSpecs();

      data.forEach((specs) => {
        /* ---Gather types--- */
        const typeData = {
          count: data.filter((data) => data.type === specs.type).length,
          typeName: specs.type,
        };
        if (!allTypes.some((item) => item.typeName === specs.type)) {
          allTypes.push(typeData);
        }

        /* ---Gather Seats--- */
        const seatsData = {
          count: data.filter((data) => data.seats === specs.seats).length,
          seats: `${specs.seats} seats`,
        };
        if (!allSeats.some((item) => item.seats === `${specs.seats} seats`)) {
          allSeats.push(seatsData);
        }

        /* ---Gather Prices--- */
        const pricesData = specs.rental_price;
        console.log(specs.rental_price);
        if (!allPrices.some((price) => price === specs.rental_price)) {
          allPrices.push(pricesData);
        }
      });

      setTypes(allTypes);
      setSeats(allSeats);
      setPrices(allPrices);
    }
    fetchCarsSpecs();
  }, []);

  /* ---Skeleton Loading--- */
  if (!types.length) {
    return <SkeletonFilters />;
  }

  return (
    <>
      <div>
        {/* ---Type--- */}
        <h3 className="text-xs text-secondary-300 tracking-widest">TYPE</h3>
        {/* checkboxes */}
        <ul className="flex flex-col gap-4 text-xl my-5 mb-10">
          {types.map((type, index) => {
            return (
              <Checkbox
                id={index}
                key={index}
                label={type.typeName}
                count={type.count}
              />
            );
          })}
        </ul>
      </div>
      {/* ---Seating--- */}
      <div>
        <h3 className="text-xs text-secondary-300 tracking-widest">Seating</h3>
        {/* checkboxes */}
        <ul className="flex flex-col gap-4 text-xl my-5 mb-10">
          {seats.map((seats, index) => {
            return (
              <Checkbox
                id={index}
                key={index}
                label={seats.seats}
                count={seats.count}
              />
            );
          })}
        </ul>
      </div>
      {/* ---Price--- */}
      <div>
        <h3 className="text-xs text-secondary-300 tracking-widest">PRICE</h3>
        <div className="my-5 mb-10">
          <RangeInput max={Math.max(...prices)} />
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;
