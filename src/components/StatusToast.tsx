import React, { useContext, useEffect, useState } from "react";
import Modal from "./Modal";
import { CgDanger } from "react-icons/cg";
import { IoWarningOutline } from "react-icons/io5";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import AppContext from "context/AppContext";

const StatusToast = () => {
  const context = useContext(AppContext);
  const { open, status, setOpen } = context;
  const { success, message } = status;

  useEffect(() => {
    if (open) setTimeout(() => setOpen(false), 3000);
  }, [open]);

  return (
    <div
      className={`absolute top-20 ${open ? " opacity-100" : "translate-x-80  opacity-0"} duration-400 right-10 flex h-[50px] w-auto items-center space-x-2 rounded px-3 transition-all ease-out  ${success ? "bg-green-600" : "bg-red-600"}`}
    >
      {/* <span className="absolute -left-1 -top-1 flex h-5 w-5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative  inline-flex h-5 w-5 rounded-full border-2 border-green-200 bg-white"></span>
      </span> */}
      {success ? (
        <IoCheckmarkCircleOutline size={25} className="text-white" />
      ) : (
        <IoWarningOutline size={25} className="text-white" />
      )}
      <p className="text-baseline font-roboto font-medium text-white">
        {message}
      </p>
    </div>
  );
};

export default StatusToast;
