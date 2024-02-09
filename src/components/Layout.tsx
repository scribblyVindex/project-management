import { usePathname } from "node_modules/next/navigation";
import React, { useEffect, useState } from "react";
import { useProject } from "~/hooks/project";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const pathname = usePathname();
  const [userProjects, setUserProjects] = useState([]);
  const { allProjects, fetchingAll, fetchedAll, fetchAllError } = useProject({
    fetchAll: true,
  });

  useEffect(() => {
    if (allProjects.length) {
      setUserProjects(allProjects);
    }
  }, [allProjects]);

  return (
    <div className=" h-screen grid-rows-12 bg-transparent">
      <div className=" bg-transparent ">
        <Navbar projectList={userProjects} />
      </div>

      <div className=" flex h-[93vh]">
        <Sidebar hidden={!pathname.includes("project")} />

        <div className="h-full w-full overflow-scroll bg-transparent">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
