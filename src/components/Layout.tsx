import { usePathname } from "node_modules/next/navigation";
import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = (props) => {
  const pathname = usePathname();
  return (
    <div className=" h-screen grid-rows-12 bg-transparent">
      <div className=" bg-transparent ">
        <Navbar />
      </div>

      <div className=" flex h-[93vh]">
        {pathname.includes("project") && <Sidebar />}

        <div className="h-full w-full overflow-scroll bg-transparent">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
