import { FaListAlt, FaRegListAlt, FaTasks } from "react-icons/fa";
import {
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdOutlineFileDownloadDone,
} from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { IoMdSettings } from "react-icons/io";
import { RiUserSettingsLine, RiUserSettingsFill } from "react-icons/ri";
import {
  IoChevronUpSharp,
  IoChevronDownSharp,
  IoArrowUpCircleOutline,
  IoArrowDownCircleOutline,
} from "react-icons/io5";
import { LuCircleEqual } from "react-icons/lu";
import { GrInProgress } from "react-icons/gr";
import { AiOutlineFileDone } from "react-icons/ai";
import { RiBugLine, RiTodoLine } from "react-icons/ri";
import { TiDocumentAdd } from "react-icons/ti";
import { PiWarningBold } from "react-icons/pi";

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
  high: (
    <IoArrowUpCircleOutline
      size={20}
      color={"red"}
      className="mt-1 text-rose-600"
    />
  ),
  medium: (
    <LuCircleEqual size={20} color={"gray"} className="mt-1 text-gray-600" />
  ),
  low: (
    <IoArrowDownCircleOutline
      size={20}
      color={"green"}
      className="mt-1 text-green-600"
    />
  ),
};
export const TASKTYPE_ICONS_COLORS = {
  bug: <RiBugLine size={20} className="mt-1 text-rose-600" />,
  feature: <TiDocumentAdd size={25} className="mt-1 text-gray-600" />,
  task: <FaTasks size={20} className="mt-1 text-green-600" />,
};
export const STATUS_ICONS_COLORS = {
  todo: (
    <RiTodoLine size={20} color={"orange"} className="mt-1 text-rose-600" />
  ),
  inProgress: (
    <GrInProgress size={20} color={"gray"} className="mt-1 text-gray-600" />
  ),
  done: (
    <AiOutlineFileDone
      size={20}
      color={"green"}
      className="mt-1 text-green-600"
    />
  ),
};
