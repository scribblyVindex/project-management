import React, { useState } from "react";

import {
  IoMdArrowDroprightCircle,
  IoMdArrowDropleftCircle,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from "react-icons/io";
import { TiArrowSortedLeft, TiArrowSortedRight } from "react-icons/ti";

import { usePathname, useRouter } from "node_modules/next/navigation";
import { SIDEBAR_ITEMS } from "data/lists";
import Link from "node_modules/next/link";
const Sidebar = ({ hidden = true }) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={`${hidden ? "-translate-x-56" : "translate-x-0"} w-[250px] ${open ? "w-[220px]" : "w-[60px]"} bg-transparent transition-all duration-200 ease-in-out`}
    >
      <div
        className={` z-15 left-0 top-20 h-full overflow-hidden  bg-white px-2  pt-24 transition-all ${open ? "w-[220px]" : "w-[60px]"} border border-r-2 border-gray-200 duration-200 ease-in-out`}
      >
        <button
          className={`absolute ${open ? "left-[200px]" : "left-[46px]"} top-10 transition-all duration-300  ease-in-out `}
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <IoMdArrowDropleft className="text-gray-400 " size={32} />
          ) : (
            <IoMdArrowDropright className="text-gray-400" size={32} />
          )}
        </button>

        <ul className="flex flex-col space-y-3">
          {SIDEBAR_ITEMS.map(({ icon, activeIcon, label, href }, index) => {
            const isPage = pathname.includes(href);
            return (
              <li key={index}>
                <Link
                  href={href}
                  className={` ${isPage ? "bg-purple2 text-white" : "hover:bg-purple2 hover:text-white"} flex ${open ? "w-[200px]" : ""} text-baseline  items-center space-x-6 rounded p-2  font-roboto text-purple2 transition-all duration-300`}
                >
                  {pathname.includes(href) ? activeIcon : icon}
                  {open && <p>{label}</p>}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
