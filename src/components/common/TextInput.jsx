const TextInput = ({ name, label, placeHolder, bgWhite, onChange, button }) => {
  return (
    <div className="flex flex-col gap-2 my-2">
      {name && (
        <label
          htmlFor={name}
          className="font-semibold text-secondary-500 text-sm"
        >
          {label}
        </label>
      )}
      <div className="relative flex w-full">
        <input
          type="text"
          id={name}
          placeholder={placeHolder}
          onChange={onChange}
          className={`${button ? "pr-20" : ""} w-full p-4 ${
            bgWhite ? "bg-white" : "bg-[#F6F7F9]"
          } rounded-[10px] text-xs placeholder:text-secondary-300 text-secondary-500 focus:ring-1 focus:ring-secondary-300 border-none outline-none`}
        />
        {button && (
          <span
            className={`!absolute right-3 h-full flex justify-center items-center text-xs font-bold cursor-pointer ${
              button.value ? "text-secondary-500" : "text-secondary-500/60"
            }`}
          >
            {button.title}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextInput;
