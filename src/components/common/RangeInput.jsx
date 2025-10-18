import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

const RangeInput = ({ min, max, onChange, param }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  /* ---Initialize range value--- */
  const paramValue = searchParams.get("maxPrice");
  const [rangeValue, setRangeValue] = useState(paramValue || max);

  const changeHandler = (e) => {
    setRangeValue(e.target.value);
  };

  /*--- Check for params change ---*/
  useEffect(() => {
    setRangeValue(paramValue || max);
  }, [searchParams.get(param)]);

  return (
    <div className="flex flex-col gap-3">
      <input
        className="rounded-lg overflow-hidden appearance-none bg-secondary-300 h-3 w-full"
        id="range"
        type="range"
        title={rangeValue}
        min={min}
        max={max}
        value={rangeValue}
        step="1"
        onMouseUp={() => onChange(param, rangeValue, "add-value", true)}
        onChange={changeHandler}
      />

      <label
        htmlFor="range"
        className="dark:text-slate-300 text-secondary-400 font-semibold flex flex-col gap-2"
      >
        <div className="flex flex-wrap gap-[0.1em]">
          <span>Price Range:</span>
          <span>
            {min === parseInt(rangeValue) ? (
              <span>${rangeValue}</span>
            ) : (
              <span>
                ${min} to ${rangeValue}
              </span>
            )}
          </span>
        </div>

        <span>Max. ${max}</span>
      </label>
    </div>
  );
};

export default RangeInput;
