const RangeInput = ({ max, onChange, param }) => {
  const changeHandler = (e) => {
    const priceFilter = e.target.value;
    onChange(param, priceFilter, true);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        className="rounded-lg overflow-hidden appearance-none bg-secondary-300 h-3 w-full"
        id="range"
        type="range"
        min="1"
        max={max}
        step="1"
        onMouseUp={changeHandler}
      />

      <label htmlFor="range" className="text-secondary-400 font-semibold">
        Max. ${max}
      </label>
    </div>
  );
};

export default RangeInput;
