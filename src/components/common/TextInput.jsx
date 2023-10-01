const TextInput = ({ name, label, placeHolder, bgWhite, onChange, button }) => {
  return (
    <div className="flex flex-col gap-2 my-2">
      {name && (
        <label
          htmlFor={name}
          className="dark:text-slate-300 font-semibold text-secondary-500 text-sm lg:text-base"
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
            bgWhite
              ? "dark:bg-slate-400 dark:focus:ring-slate-200 dark:placeholder:text-slate-900 dark:text-slate-900 bg-white"
              : "dark:text-slate-400 dark:placeholder:text-slate-400 dark:focus:ring-slate-400  dark:bg-slate-800 bg-[#F6F7F9]"
          }  dark:focus:ring-2 rounded-[10px] text-xs placeholder:text-secondary-300 text-secondary-500 focus:ring-1 focus:ring-secondary-300 border-none outline-none lg:text-sm`}
        />
        {button && (
          <span
            className={`!absolute right-3 h-full flex justify-center items-center text-xs font-bold cursor-pointer lg:text-base ${
              button.value
                ? "dark:text-slate-300 text-secondary-500"
                : "dark:text-slate-300/40 text-secondary-500/40"
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
