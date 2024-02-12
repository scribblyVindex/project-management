import React, { useEffect, useState } from "react";
import Foco from "react-foco";
import Avatar from "./Avatar";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronsUp } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import {
  PRIORITY_ICONS_COLORS,
  STATUS_ICONS_COLORS,
  TASKTYPE_ICONS_COLORS,
} from "data/lists";
import { capitalise } from "~/utils/helpers";
import { IoChevronUpSharp, IoChevronDownSharp } from "react-icons/io5";
import { HiMiniChevronDoubleUp } from "react-icons/hi2";
import { TbProgressAlert } from "react-icons/tb";
import {
  IoArrowUndoCircleOutline,
  IoArrowDownCircleOutline,
} from "react-icons/io5";

const staticPriority = "feature";

const staticPrioritys = ["bug", "feature", "task", "custom"];

const inputTypes = {
  status: STATUS_ICONS_COLORS,
  type: TASKTYPE_ICONS_COLORS,
  priority: PRIORITY_ICONS_COLORS,
};

const customInputs = {
  status: (
    <TbProgressAlert size={20} className=" mt-1 border-black text-purple-600" />
  ),
  type: <MdOutlineCategory size={20} />,
  priority: (
    <IoArrowUndoCircleOutline
      size={20}
      className=" mt-1 border-black text-purple-600"
    />
  ),
};

const SelectInput = ({
  optionsList,
  selectedOption,
  setSelectedOption = () => {},
  inputType,
  modalOpen = false,
}) => {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState();
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log("selectedOption", selectedOption);
    if (selectedOption) setOption(selectedOption);
    if (optionsList) setOptions(optionsList);
  }, [selectedOption, optionsList]);
  useEffect(() => {
    if (option) setOptions(optionsList.filter((opt) => opt !== option));
  }, [option]);

  useEffect(() => {
    if (!modalOpen) {
      setOption();
      setOptions();
    }
  }, [modalOpen]);

  return (
    <Foco
      onClickOutside={() => setOpen(false)}
      onClickInside={() => setOpen(true)}
      className="z-10 flex flex-col space-y-1  "
    >
      <div
        className={` flex h-10 w-52 justify-between rounded-sm bg-white p-2 ring-2 ring-gray-200   ${open && " ring-purple1"} transition-all duration-100`}
      >
        <button onClick={() => setOpen(true)} className="flex items-center  ">
          <div className="h-8 w-8">
            {inputTypes[inputType][option] || customInputs[inputType]}
          </div>
          <p>{option ? capitalise(option) : "Select option"}</p>
        </button>
        <button
          onClick={() => {
            setOpen(!open);
            if (open) {
              setOption();
              setOptions(optionsList);
            }
          }}
        >
          {open ? <RxCross2 /> : <IoIosArrowDown />}
        </button>
      </div>

      <div>
        {open && (
          <div className=" flex  w-52  flex-col items-center justify-center overflow-scroll  rounded-sm border border-gray-300 bg-transparent bg-white py-2 drop-shadow-md">
            <div className=" flex w-full flex-col text-left ">
              {options?.map((option, index) => (
                <button
                  onClick={() => {
                    setSelectedOption(option);
                    setOption(option);
                    setOpen(false);
                  }}
                  className="flex h-full w-full items-center overflow-hidden  border-black  px-2 py-2 hover:bg-gray-100"
                >
                  <div className="h-8 w-8">
                    {inputTypes[inputType][option] || customInputs[inputType]}
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

export default SelectInput;
