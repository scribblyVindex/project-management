import AppContext from "context/AppContext";
import { usePathname } from "node_modules/next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { useProject } from "~/hooks/project";
import CreateUpdateTaskButton from "./CreateUpdateTaskButton";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import StatusToast from "./StatusToast";
import { FaPlus } from "react-icons/fa";

const Layout = (props) => {
  const pathname = usePathname();
  const [userProjects, setUserProjects] = useState([]);
  const [open, setOpen] = useState(false);

  const { allProjects, fetchingAll, fetchedAll, fetchAllError } = useProject({
    fetchAll: true,
  });

  useEffect(() => {
    if (allProjects.length) {
      setUserProjects(allProjects);
    }
  }, [allProjects]);

  return (
    <div className=" h-screen grid-rows-12 bg-slate-100">
      <div className=" bg-transparent ">
        <Navbar projectList={userProjects} />
      </div>

      <div className=" flex h-[93vh]">
        <Sidebar hidden={!pathname.includes("project")} />

        <div className="h-full w-full overflow-scroll bg-transparent">
          {props.children}
        </div>
        {/* <CreateUpdateTaskButton /> */}
        {/* <button
          onClick={() => setOpen(!open)}
          className={`z-10 flex items-center justify-center shadow-md ${pathname.includes("project") ? "opacity-100" : " translate-x-32 opacity-0"}    absolute bottom-16 right-16 h-16 w-16 rounded-full bg-white text-4xl  transition-all duration-500 `}
        >
          <FaPlus
            size={20}
            title={"Create Task"}
            className={`${open ? "-rotate-135" : ""} text-purple2 transition-all duration-500 `}
          />
        </button>
        <CreateUpdateTaskButton
          allProjects={allProjects}
          open={open}
          setOpen={setOpen}
        /> */}
      </div>
      <StatusToast />
    </div>
  );
};

export default Layout;
