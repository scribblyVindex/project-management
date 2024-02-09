import React from "react";
import DropDown from "./DropDown";

const Navbar = () => {
  return (
    <>
      <div className="sticky z-10 h-[6vh] place-items-center border border-black bg-black  shadow-lg">
        <section className="relative mx-auto">
          <nav className="flex w-full justify-between bg-white text-white ">
            <div className="flex w-auto justify-between  space-x-16 px-5 py-3 xl:px-8">
              <a
                className="font-heading text-purple1  border-black text-3xl font-bold"
                href="#"
              >
                Manager
              </a>
              <ul className="font-heading mx-auto hidden space-x-12  border-black  font-semibold md:flex">
                <li>
                  <button
                    id="dropdown-button"
                    className="text-purple2 inline-flex w-full justify-center rounded-sm  border-gray-300 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    {"Dashboard"}
                  </button>
                </li>
                <li>
                  <DropDown
                    title="Projects"
                    onItemClick={(item: any) => console.log(item)}
                  />
                </li>
              </ul>
            </div>
            <div className=" hidden items-center justify-between  space-x-5 px-5 xl:flex">
              <button
                id="dropdown-button"
                className="text-purple2 inline-flex w-full justify-center rounded-sm  border-gray-300 px-4 py-2 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              >
                {"PROFILE"}
              </button>
            </div>
          </nav>
        </section>
      </div>
    </>
  );
};

export default Navbar;
