import React, { useEffect, useState } from "react";
import Foco from "react-foco";
import Avatar from "./Avatar";
import { RxCross2 } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const staticUser = {
  id: "clsb0xh3u00008dedeu9low33",
  name: "Aditya Shende",
  email: "adityashende1234567@gmail.com",
  emailVerified: null,
  image:
    "https://lh3.googleusercontent.com/a/ACg8ocKwzJzGfWFGUK5VJdqXaOaGVBleLZHWSm0PzhDl0pzK=s96-c",
};

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
    id: "clsb0xh3u00008dedeu9low33",
    name: "Aditya Shende2",
    email: "adityashende1234567@gmail.com",
    emailVerified: null,
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKwzJzGfWFGUK5VJdqXaOaGVBleLZHWSm0PzhDl0pzK=s96-c",
  },
];

const UserSelectInput = ({
  peopleList = staticUsers || [],
  selectedUser = staticUser,
}) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(peopleList);
  const [user, setUser] = useState();

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, [selectedUser]);

  return (
    <Foco
      onClickOutside={() => setOpen(false)}
      onClickInside={() => setOpen(true)}
      className="flex flex-col space-y-1"
    >
      <div
        className={`mt-10 flex h-10 w-52 justify-between rounded-sm bg-white p-2 ${open && "ring-purple1 ring-2"} transition-all duration-100`}
      >
        <button onClick={() => setOpen(true)} className="flex items-center ">
          <div className="h-8 w-8">
            {user ? (
              <Avatar src={user.image} alt={user.name} />
            ) : (
              <FaUserCircle size={30} className=" border-black" />
            )}
          </div>
          <p>{user?.name || "Unassigned"}</p>
        </button>
        <button
          onClick={() => {
            if (open) {
              setUser();
              setOptions(peopleList);
            }
            setOpen(!open);
          }}
        >
          {open ? <RxCross2 /> : <IoIosArrowDown />}
        </button>
      </div>

      <div>
        {open && (
          <div className="absolute flex  w-52 flex-col items-center justify-center  rounded-sm border border-gray-300 bg-transparent bg-white py-2 drop-shadow-md">
            <div className="relative flex w-full flex-col text-left ">
              {options?.map((option, index) => (
                <button
                  onClick={() => {
                    setUser(option);
                    setOptions(peopleList.filter((opt) => opt !== option));
                    setOpen(false);
                  }}
                  className="flex h-full w-full items-center overflow-hidden border-black  px-2 py-2 hover:bg-gray-100"
                >
                  <div className="h-8 w-8">
                    <Avatar src={option.image} alt={option.name} />
                  </div>
                  <p>{option?.name}</p>
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
