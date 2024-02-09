import { FaListAlt, FaRegListAlt } from "react-icons/fa";
import { MdOutlineSpaceDashboard, MdSpaceDashboard } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { RiUserSettingsLine, RiUserSettingsFill } from "react-icons/ri";
import { IoChevronUpSharp, IoChevronDownSharp } from "react-icons/io5";
import { LuEqual } from "react-icons/lu";
export const SIDEBAR_ITEMS = [
  {
    icon: <FaRegListAlt size={23} />,
    activeIcon: <FaListAlt size={23} />,

    label: "List View",
    href: "list",
  },
  {
    icon: <MdOutlineSpaceDashboard size={26} />,
    activeIcon: <MdSpaceDashboard size={26} />,
    label: "Board View",
    href: "board",
  },
  {
    icon: <LuSettings size={26} />,
    activeIcon: <IoMdSettings size={26} />,
    label: "Project Settings",
    href: "settings",
  },
  // {
  //   icon: <RiUserSettingsLine size={26} />,
  //   activeIcon: <RiUserSettingsFill size={26} />,
  //   label: "User Settings",
  //   href: "/dashboard",
  // },
];

export const PRIORITY_ICONS_COLORS = {
  high: <IoChevronUpSharp size={20} className="mt-1 text-rose-600" />,
  medium: <LuEqual size={20} className="mt-1 text-gray-600" />,
  low: <IoChevronDownSharp size={20} className="mt-1 text-green-600" />,
};
