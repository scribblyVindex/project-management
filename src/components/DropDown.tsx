import { usePathname } from "node_modules/next/navigation";
import React, { useEffect, useState } from "react";
import Foco from "react-foco";

const DropDown = ({
  title = "Select Item",
  labelKey = "label",
  valueKey = "value",
  options = [
    { value: "option1", label: "Option 1983742983478239" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ],
  addNew = false,
  onAddNew = () => {},
  onItemClick = () => {},
  dropDownContent,
  titleButton,
  addNewContent,
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Foco
      onClickOutside={() => setOpen(false)}
      onFocusOutside={() => setOpen(false)}
    >
      <div className="flex  flex-col items-center justify-center rounded-sm  bg-transparent ">
        <div className="relative inline-block text-left">
          {titleButton(() => setOpen(!open)) || (
            <button
              onClick={(e) => setOpen(!open)}
              id="dropdown-button"
              className="inline-flex w-full justify-center rounded-sm border-gray-300  px-4 py-2 text-sm font-medium text-purple2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
            >
              {title}
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="-mr-1 ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              ></svg> */}
            </button>
          )}
          {open && (
            <>
              <div
                id="dropdown-menu"
                className="absolute left-0 mt-3  h-auto max-h-40 w-auto  origin-top-right rounded-sm border border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5"
              >
                <div
                  className="  overflow-scroll"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-button"
                >
                  {options.map((details, index) =>
                    dropDownContent ? (
                      dropDownContent(
                        details[labelKey],
                        details[valueKey],
                        onItemClick,
                        index,
                      )
                    ) : (
                      <button
                        onClick={() => {
                          onItemClick(details[valueKey]);
                        }}
                        key={index}
                        className="mb-1 min-w-48 max-w-80 rounded-sm  bg-white px-4 py-2 text-left font-lato text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {details[labelKey]}
                      </button>
                    ),
                  )}
                </div>
                <div className="border-t-2 border-gray-200">
                  {addNew && addNewContent ? (
                    addNewContent
                  ) : (
                    <>
                      <input
                        type="text"
                        id="input-field"
                        className="mb-2 w-full rounded-sm border px-4 py-2 focus:border-blue-500 focus:outline-none"
                        placeholder="Enter New Item"
                      />
                      <button
                        onClick={onAddNew}
                        id="submit-button"
                        className="w-full rounded-sm bg-blue-600 px-4 py-2 text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Add
                      </button>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Foco>
  );
};

export default DropDown;
