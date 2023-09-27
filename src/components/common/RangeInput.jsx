import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const RangeInput = ({ max, onChange, param }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramValue = searchParams.get("maxPrice");
  const [rangeValue, setRangeValue] = useState(paramValue || max);

  const changeHandler = (e) => {
    setRangeValue(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        className="rounded-lg overflow-hidden appearance-none bg-secondary-300 h-3 w-full"
        id="range"
        type="range"
        min="1"
        max={max}
        value={rangeValue}
        step="1"
        onMouseUp={() => onChange(param, rangeValue, "add-value", true)}
        onChange={changeHandler}
      />

      <label htmlFor="range" className="text-secondary-400 font-semibold">
        Max. ${max}
      </label>
    </div>
  );
};

export default RangeInput;
