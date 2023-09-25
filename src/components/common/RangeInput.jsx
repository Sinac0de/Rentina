const RangeInput = ({ max }) => {
  const changeHandler = (e) => {
    const priceFilter = e.target.value;
    // Todo : Set form value
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
