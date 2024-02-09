import { FaListAlt, FaRegListAlt } from "react-icons/fa";
import { MdOutlineSpaceDashboard, MdSpaceDashboard } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { RiUserSettingsLine, RiUserSettingsFill } from "react-icons/ri";
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
