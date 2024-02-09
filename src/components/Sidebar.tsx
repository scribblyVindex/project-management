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
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={` z-8 left-0 top-20 overflow-hidden bg-white px-2 pt-20   ${open ? "w-[250px]" : "w-[60px]"} border border-r-2 border-gray-200 duration-200 ease-in-out`}
    >
      <button
        className={`absolute ${open ? "left-[200px]" : "left-[46px]"} top-24 transition-all duration-300  ease-in-out `}
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
                className={` ${isPage ? "bg-purple2 text-white" : "hover:bg-purple2 hover:text-white"} flex ${open ? "w-[200px]" : ""} text-purple2  items-center space-x-6 rounded p-2  transition-all duration-300 `}
              >
                {pathname.includes(href) ? activeIcon : icon}
                {open && <p>{label}</p>}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
