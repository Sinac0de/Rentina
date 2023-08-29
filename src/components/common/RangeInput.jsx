const RangeInput = () => {
  return (
    <div className="flex flex-col gap-3">
      <input
        className="rounded-lg overflow-hidden appearance-none bg-secondary-300 h-3 w-full"
        id="range"
        type="range"
        min="1"
        max="100"
        step="1"
      />
      <label htmlFor="range" className="text-secondary-400 font-semibold">
        Max. $100.00
      </label>
    </div>
  );
};

export default RangeInput;
