const BigSelectInput = ({ id, label, options }) => {
  return (
    <div className="flex flex-col w-full h-fit">
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="w-full p-3 bg-[#F6F7F9] rounded-[10px] text-xs placeholder:text-secondary-300 text-secondary-500 focus:ring-1 focus:ring-secondary-300 border-none outline-none"
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

export default BigSelectInput;
