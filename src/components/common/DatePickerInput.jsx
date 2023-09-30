const DatePickerInput = ({ id, isCompact, label }) => {
  return (
    <div
      className={`${
        isCompact ? "px-2" : "gap-2"
      } dark:text-slate-300 flex flex-col w-full h-fit`}
    >
      <label htmlFor={id} className="text-base font-bold">
        {label}
      </label>
      <input
        type="date"
        id={id}
        name={id}
        className={`${
          isCompact
            ? "bg-transparent  w-full text-sm focus:border-none focus:outline-none"
            : "w-full py-4 bg-[#F6F7F9] rounded-[10px] text-xs focus:ring-1 focus:ring-secondary-300 border-r-[14px] border-transparent pl-4 outline-none lg:text-sm cursor-pointer"
        } dark:text-slate-300 text-secondary-300`}
      />
    </div>
  );
};

export default DatePickerInput;
