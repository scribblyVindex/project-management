import React from "react";
import DropDown from "./DropDown";

const Navbar = () => {
  return (
    <>
      <div className="sticky top-0 z-10  place-items-center">
        <section className="relative mx-auto">
          <nav className="flex w-screen justify-between bg-white text-white shadow-md">
            <div className="flex w-auto justify-between  space-x-16 px-5 py-6 xl:px-8">
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
              {/* <a className="flex items-center hover:text-gray-200" href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 hover:text-gray-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a> */}
            </div>
          </nav>
        </section>
      </div>
    </>
  );
};

export default Navbar;
