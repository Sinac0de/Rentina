import DatePicker from "tailwind-datepicker-react";
import { useState } from "react";
import ArrowDown from "../../assets/Icons/ArrowDown";

/* ---DatePicker Component--- */
const DatePickerInput = ({ isCompact, id, title }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    isCompact ? new Date().toLocaleDateString() : new Date().toDateString()
  );

  /* ---DatePicker features settings--- */
  const options = {
    title: title,
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "shadow-lg border border-secondary-100/50",
      todayBtn: "",
      clearBtn:
        "bg-red-400 text-white hover:bg-red-600 focus:ring-0 focus:border-none border-none",
      icons: "",
      text: "",
      disabledText: "",
      input: "",
      inputIcon: "",
      selected: "bg-primary-500",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>Previous</span>,
      next: () => <span>Next</span>,
    },

    /* ---Date picker info settings--- */
    datepickerClassNames: isCompact
      ? "absolute left-1 right-0 top-10 z-20"
      : "absolute z-50 top-20",
    defaultDate: new Date(),
    language: "en",
  };

  /* ---Handlers--- */
  const handleChange = (selectedDate) => {
    setSelectedDate(
      isCompact
        ? selectedDate.toLocaleDateString()
        : selectedDate.toDateString()
    );
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className={`${isCompact ? "px-2" : "relative my-5"} w-full lg:my-0`}>
      <DatePicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      >
        <div
          className={`flex flex-col w-full h-fit overflow-hidden ${
            isCompact ? "gap-0" : "gap-2"
          }`}
        >
          <label
            htmlFor={id}
            className={`font-bold ${isCompact ? "" : "text-sm lg:text-base"} `}
          >
            Date
          </label>
          <div className="relative cursor-pointer flex items-start">
            <input
              type="text"
              id={id}
              className={`${
                isCompact
                  ? ""
                  : "bg-[#F6F7F9] rounded-[10px] placeholder:pl-1 focus:ring-1 focus:ring-secondary-300 w-full p-4  border-r-[14px] border-transparent px-4"
              } outline-none text-secondary-300 placeholder:text-secondary-300 text-sm placeholder:text-sm cursor-pointer`}
              placeholder="Select Pick-Up Date"
              value={selectedDate}
              onFocus={() => setShow(true)}
              readOnly
            />
            {/* arrow icon */}
            <label
              htmlFor={id}
              className="absolute h-full flex items-center top-[1px] right-[1px] cursor-pointer"
            >
              <ArrowDown />
            </label>
          </div>
        </div>
      </DatePicker>
    </div>
  );
};

export default DatePickerInput;
