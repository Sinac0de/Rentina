import { Input } from "@material-tailwind/react";

const TextInput = ({
  name,
  staticLabel,
  dynamicLabel,
  placeHolder,
  button,
}) => {
  return (
    <div className="flex flex-col gap-2 my-2">
      {name && (
        <label
          htmlFor={name}
          className="font-semibold text-secondary-500 text-sm"
        >
          {staticLabel}
        </label>
      )}
      <div className="relative flex w-full">
        <input
          type="text"
          //   label={dynamicLabel ? dynamicLabel : null}
          id={name}
          placeholder={placeHolder}
          className={`${
            button ? "pr-20" : ""
          } w-full p-2 bg-[#F6F7F9] rounded-[10px]`}
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
