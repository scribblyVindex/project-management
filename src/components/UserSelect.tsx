import React, { useEffect, useState } from "react";
import Foco from "react-foco";
import Avatar from "./Avatar";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FiChevronsUp } from "react-icons/fi";
import { MdOutlineCategory } from "react-icons/md";
import {
  PRIORITY_ICONS_COLORS,
  STATUS_ICONS_COLORS,
  TASKTYPE_ICONS_COLORS,
} from "data/lists";
import { capitalise } from "~/utils/helpers";
import { IoChevronUpSharp, IoChevronDownSharp } from "react-icons/io5";
import { HiMiniChevronDoubleUp } from "react-icons/hi2";
import { TbProgressAlert } from "react-icons/tb";

const staticUsers = [
  {
    id: "clsb0xh3u00008dedeu9low33",
    name: "Aditya Shende3",
    email: "adityashende1234567@gmail.com",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKwzJzGfWFGUK5VJdqXaOaGVBleLZHWSm0PzhDl0pzK=s96-c",
  },
  {
    id: "clsb0xh3u00008dedeu9low33ss",
    name: "Aditya Shende2",
    email: "adityashende1234567@gmail.com",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKwzJzGfWFGUK5VJdqXaOaGVBleLZHWSm0PzhDl0pzK=s96-c",
  },
];

const UserSelectInput = ({
  usersList,
  selectedUser,
  setSelectedUser = () => {},
  modalOpen = false,
}) => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(selectedUser);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (selectedUser) setUser(selectedUser);
    if (usersList) setUsers(usersList);
  }, [selectedUser, usersList]);

  useEffect(() => {
    if (user) setUsers(usersList.filter((person) => person.id !== user.id));
  }, [user]);

  useEffect(() => {
    if (!modalOpen) {
      setUser();
      setUsers();
    }
  }, [modalOpen]);

  return (
    <Foco
      onClickOutside={() => setOpen(false)}
      onClickInside={() => setOpen(true)}
      className="z-10 flex flex-col space-y-1  "
    >
      <div
        className={` flex h-10 w-52 justify-between rounded-sm bg-white p-2 ring-2 ring-gray-200   ${open && " ring-purple1"} transition-all duration-100`}
      >
        <button
          onClick={() => setOpen(true)}
          className="flex   items-center space-x-2 px-2  "
        >
          <div className="h-6 w-6">
            {user ? (
              <Avatar src={user.image} alt={user.name} />
            ) : (
              <FaUserCircle
                className=" mt-1 border-black text-purple-600"
                size={20}
              />
            )}
          </div>
          <p>{user?.name || "Unassigned"}</p>
        </button>
        <button
          onClick={() => {
            setOpen(!open);
            if (open) {
              setUser();
              setUsers(usersList);
              setSelectedUser();
            }
          }}
        >
          {open ? <RxCross2 /> : <IoIosArrowDown />}
        </button>
      </div>

      <div>
        {open && (
          <div className=" flex  w-52  flex-col items-center justify-center overflow-scroll  rounded-sm border border-gray-300 bg-transparent bg-white py-2 drop-shadow-md">
            <div className=" flex w-full flex-col text-left ">
              {users?.map((user, index) => (
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setUser(user);
                    setOpen(false);
                  }}
                  className="flex h-full w-full items-center space-x-2  overflow-hidden  border-black px-2 py-2 hover:bg-gray-100"
                >
                  <div className="h-6 w-6">
                    {user ? (
                      <Avatar src={user.image} alt={user.name} />
                    ) : (
                      <FaUserCircle size={30} className=" border-black" />
                    )}
                  </div>
                  <p>{user?.name}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Foco>
  );
};

export default UserSelectInput;
