import { useEffect, useState } from "react";
import CheckBoxFilled from "../../assets/Icons/CheckBoxChecked";
import { useSearchParams } from "react-router";

const Checkbox = ({ id, label, count, onChange, param }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // initialize checked
  const isChecked = searchParams.getAll(param).includes(label);
  const [checked, setChecked] = useState(isChecked);

  const handleCheck = (e) => {
    setChecked((prev) => !prev);
    // handle searchParams
    if (checked) {
      onChange(param, e.target.value, "delete-value", false);
    } else {
      onChange(param, e.target.value, "add-value", false);
    }
  };

  /*--- Check for params change ---*/
  useEffect(() => {
    setChecked(isChecked);
  }, [searchParams.getAll(param)]);

  return (
    <div key={id} className="flex items-center">
      <div className="flex items-center mr-4 mb-2">
        <input
          id={label}
          type="checkbox"
          value={label}
          className="opacity-0 absolute h-5 w-5 cursor-pointer"
          checked={checked}
          onChange={handleCheck}
        />
        <div
          className={`${
            !checked ? "border-[1px] border-secondary-300 rounded-md" : ""
          } h-5 w-5 flex flex-shrink-0 justify-center items-center`}
        >
          <CheckBoxFilled />
        </div>
        <label
          htmlFor={label}
          className="dark:text-slate-300 ml-2 text-sm text-secondary-400 font-semibold"
        >
          {label} <span className="text-secondary-300">({count})</span>
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
