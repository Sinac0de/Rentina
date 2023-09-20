const BigSelectInput = ({ id, label, options }) => {
  return (
    <div className="flex flex-col w-full h-fit gap-2">
      <label htmlFor={id} className="font-semibold text-sm lg:text-base">
        {label}
      </label>
      <select
        id={id}
        name={id}
        className="w-full p-4 bg-[#F6F7F9] rounded-[10px] text-xs text-secondary-300 focus:ring-1 focus:ring-secondary-300 border-r-[14px] border-transparent px-4 outline-none lg:text-sm"
      >
        {options.map((option) => {
          return (
            <option
              className="text-secondary-300 text-xs"
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
