import Link from "node_modules/next/link";
import { useRouter } from "node_modules/next/router";
import React, { useEffect, useState } from "react";
import DropDown from "./DropDown";
import ProjectModal from "./ProjectModal";

const Navbar = ({ projectList }) => {
  const [projects, setProjects] = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (projectList.length) setProjects(projectList);
  }, [projectList]);

  const titleButton = (clickHandle) => {
    return (
      <button
        onClick={clickHandle}
        id="dropdown-button"
        className="flex-center w-full justify-center rounded border-gray-300  px-4 py-1 font-lato text-lg font-medium  text-purple2  outline-none  transition-all  duration-200 ease-in-out hover:bg-purple2 hover:text-white focus:ring-purple2"
      >
        {"Projects"}
      </button>
    );
  };

  return (
    <>
      <div className="sticky z-10 h-[6vh] place-items-center  border-black bg-black  shadow-lg">
        <section className="relative mx-auto h-full ">
          <nav className="flex h-full w-full justify-between bg-white text-white ">
            <div className="flex h-full w-auto items-center justify-between space-x-16 px-5 xl:px-8 ">
              <a className="font-heading border-black  text-3xl font-bold text-purple1">
                Manager
              </a>
              <ul className="font-heading  mx-auto flex h-full items-center  space-x-12 border-black font-semibold md:flex">
                <li>
                  <Link
                    href={"/"}
                    id="dropdown-button"
                    className="flex-center w-full justify-center rounded border-gray-300  px-4 py-2 font-lato text-lg font-medium  text-purple2  outline-none  transition-all  duration-200 ease-in-out hover:bg-purple2 hover:text-white focus:ring-purple2 "
                  >
                    {"Dashboard"}
                  </Link>
                </li>
                <li>
                  <DropDown
                    title="Projects"
                    titleButton={titleButton}
                    onItemClick={(item: any) => {
                      router.push("/project?id=" + item);
                    }}
                    options={projects || []}
                    labelKey="name"
                    valueKey="id"
                    addNewContent={<ProjectModal />}
                    addNew={true}
                  />
                </li>
              </ul>
            </div>
            <div className=" hidden items-center justify-between  space-x-5 px-5 xl:flex">
              <button
                id="dropdown-button"
                className="inline-flex w-full justify-center rounded-sm border-gray-300  px-4 text-sm  font-medium text-purple2 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
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
