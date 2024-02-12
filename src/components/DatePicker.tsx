import React, { useLayoutEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import Foco from "react-foco";

const DatePicker = ({ value, setValue }) => {
  let currentDate = new Date();
  let maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() + 1);

  const scrollRef = useRef(null);

  const [open, setOpen] = useState();

  const handleChange = (e) => {
    let dueDate = new Date(e);
    dueDate.setMonth(dueDate.getMonth() + 1);

    setValue(dueDate);
    setOpen(false);
  };

  const dateToString = (dt) => {
    if (dt !== undefined) {
      return dt.getDate() + " / " + dt.getMonth() + " / " + dt.getFullYear();
    } else {
      return "nthng";
    }
  };
  return (
    <Foco onClickOutside={() => setOpen(false)} className=" z-10">
      <button
        onClick={() => setOpen(!open)}
        className="relative h-10 w-[10vw] rounded-sm border  px-2 text-left font-roboto text-sm ring-1 ring-gray-200"
      >
        {value && dateToString(value)}
      </button>

      <div
        className={`z-8 absolute h-10  -translate-y-[30vh] translate-x-[10vw] bg-black transition-all duration-200 ${open ? "opacity-100" : "invisible  opacity-0 "}`}
      >
        <Calendar minDate={new Date()} onChange={handleChange} value={value} />
      </div>
    </Foco>
  );
};

export default DatePicker;
