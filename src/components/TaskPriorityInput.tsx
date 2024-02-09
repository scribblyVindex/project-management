import React, { useEffect, useState } from "react";
import Foco from "react-foco";
import Avatar from "./Avatar";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronsUp } from "react-icons/fi";
import { PRIORITY_ICONS_COLORS } from "data/lists";
import { capitalise } from "~/utils/helpers";
import { IoChevronUpSharp, IoChevronDownSharp } from "react-icons/io5";
import { HiMiniChevronDoubleUp } from "react-icons/hi2";
const staticPriority = "medium";

const staticPrioritys = ["high", "medium", "low", "custom"];

const TaskPriorityInput = ({
  prioritysList = staticPrioritys || [],
  selectedPriority = staticPriority,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(prioritysList);
  const [priority, setPriority] = useState(selectedPriority);

  useEffect(() => {
    if (selectedPriority) {
      setPriority(selectedPriority);
    }
  }, [selectedPriority]);

  return (
    <Foco
      onClickOutside={() => setOpen(false)}
      onClickInside={() => setOpen(true)}
      className="flex flex-col space-y-1"
    >
      <div
        className={`mt-10 flex h-10 w-52 justify-between rounded-sm bg-white p-2 ${open && "ring-purple1 ring-2"} transition-all duration-100`}
      >
        <button onClick={() => setOpen(true)} className="flex items-center ">
          <div className="h-8 w-8">
            {PRIORITY_ICONS_COLORS[priority] || (
              <HiMiniChevronDoubleUp
                size={20}
                className=" mt-1 border-black text-purple-600"
              />
            )}
          </div>
          <p>{capitalise(priority)}</p>
        </button>
        <button
          onClick={() => {
            if (open) {
              setOptions(prioritysList);
            }
            setOpen(!open);
          }}
        >
          {open ? <RxCross2 /> : <IoIosArrowDown />}
        </button>
      </div>

      <div>
        {open && (
          <div className="absolute flex  w-52 flex-col items-center justify-center  rounded-sm border border-gray-300 bg-transparent bg-white py-2 drop-shadow-md">
            <div className="relative flex w-full flex-col text-left ">
              {options?.map((option, index) => (
                <button
                  onClick={() => {
                    setPriority(option);
                    setOptions(prioritysList.filter((opt) => opt !== option));
                    setOpen(false);
                  }}
                  className="flex h-full w-full items-center overflow-hidden  border-black  px-2 py-2 hover:bg-gray-100"
                >
                  <div className="h-8 w-8">
                    {PRIORITY_ICONS_COLORS[option] || (
                      <HiMiniChevronDoubleUp
                        size={20}
                        className="mt-1  border-black text-purple-600"
                      />
                    )}
                  </div>
                  <p>{capitalise(option)}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Foco>
  );
};

export default TaskPriorityInput;
