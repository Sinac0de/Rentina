const SmSelectInput = ({ id, label, options, borderDir }) => {
  return (
    <div
      className={`flex flex-col w-full h-fit px-2 ${
        borderDir === "right" ? "border-r-[1px]" : ""
      } ${borderDir === "left" ? "border-l-[1px]" : ""}`}
    >
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="bg-transparent text-secondary-300 text-sm focus:border-none focus:outline-none"
      >
        {options.map((option) => {
          return (
            <option
              className="text-secondary-300"
              key={option.id}
              value={option.value}
            >
              {option.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SmSelectInput;
