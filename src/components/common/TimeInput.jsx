const TimeInput = ({ id, label, borderDir }) => {
  return (
    <div
      className={`flex flex-col w-full h-fit px-2 ${
        borderDir === "right" ? "border-r-[1px]" : ""
      } ${borderDir === "left" ? "border-l-[1px]" : ""}`}
    >
      <label htmlFor={id} className="text-base font-bold">
        {label}
      </label>
      <input
        type="time"
        id={id}
        name={id}
        className="bg-transparent text-secondary-300 text-sm focus:border-none focus:outline-none"
      />
    </div>
  );
};

export default TimeInput;
