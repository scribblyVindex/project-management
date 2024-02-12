import React from "react";
import { RxCross2 } from "react-icons/rx";

const Modal = ({ open, onClose, children }) => {
  return (
    <div className="">
      <div
        // onClick={onClose}
        className={`
        fixed
        inset-0 flex items-center justify-center pt-20 transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          duration-00 rounded-md bg-white shadow transition-all
          ${open ? "-translate-y-10 opacity-100" : " -translate-y-60  opacity-0"}
        `}
        >
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md bg-white text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <RxCross2 />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
