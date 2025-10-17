const TextInput = ({
  name,
  label,
  placeHolder,
  bgWhite,
  onChange,
  button,
  type = "text",
  id,
  autoComplete,
  required,
  value,
  error,
  register,
}) => {
  return (
    <div className="flex flex-col gap-2 my-2">
      {name && (
        <label
          htmlFor={id || name}
          className="dark:text-slate-300 font-semibold text-secondary-500 text-sm lg:text-base"
        >
          {label}
        </label>
      )}
      <div className="relative flex w-full">
        <input
          type={type}
          id={id || name}
          name={name}
          placeholder={placeHolder}
          autoComplete={autoComplete}
          required={required}
          value={value}
          {...(register && register)}
          onChange={onChange || (register && register.onChange)}
          className={`${button ? "pr-20" : ""} w-full p-4 ${
            bgWhite
              ? "dark:bg-slate-400 dark:focus:ring-slate-200 dark:placeholder:text-slate-900 dark:text-slate-900 bg-white"
              : "border dark:text-slate-400 dark:placeholder:text-slate-400 dark:focus:ring-slate-400  dark:bg-slate-800 bg-[#F6F7F9]"
          } ${
            error ? "border-red-500 border-2" : ""
          } dark:focus:ring-2 rounded-[10px] text-xs placeholder:text-secondary-300 text-secondary-500 focus:ring-1 focus:ring-secondary-300 outline-none lg:text-sm`}
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
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
