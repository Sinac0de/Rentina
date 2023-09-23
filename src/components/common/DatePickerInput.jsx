import DatePicker from "tailwind-datepicker-react";
import { useState } from "react";
import ArrowDown from "../Icons/ArrowDown";

/* ---DatePicker Component--- */
const DatePickerInput = ({ id, title }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  /* ---DatePicker features settings--- */
  const options = {
    title: title,
    autoHide: true,
    todayBtn: false,
    clearBtn: true,
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "shadow-lg",
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
    datepickerClassNames: "absolute z-10 top-20",
    defaultDate: new Date(),
    language: "en",
  };

  /* ---Handlers--- */
  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate.toDateString());
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div className="relative my-5 lg:my-0">
      <DatePicker
        options={options}
        onChange={handleChange}
        show={show}
        setShow={handleClose}
      >
        <div className="flex flex-col w-full h-fit gap-2">
          <label htmlFor={id} className="font-semibold text-sm lg:text-base">
            Date
          </label>
          <div className="relative cursor-pointer">
            <input
              type="text"
              id={id}
              className="w-full p-4 bg-[#F6F7F9] rounded-[10px] text-xs text-secondary-300 placeholder:text-secondary-300 placeholder:pl-1 focus:ring-1 focus:ring-secondary-300 border-r-[14px] border-transparent px-4 outline-none lg:text-sm cursor-pointer"
              placeholder="Select Pick-Up Date"
              value={selectedDate}
              onFocus={() => setShow(true)}
              readOnly
            />
            {/* arrow icon */}
            <label
              htmlFor={id}
              className="absolute h-full flex items-center top-0 right-4 cursor-pointer"
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
