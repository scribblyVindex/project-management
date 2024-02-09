import React from "react";

const Modal = ({ open, onClose, children }) => {
  return (
    <div>
      <div
        onClick={onClose}
        className={`
        fixed inset-0 flex items-center justify-center transition-colors
        ${open ? "visible bg-black/20" : "invisible"}
      `}
      >
        {/* modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
          rounded-md bg-white p-6 shadow transition-all duration-500
          ${open ? "-translate-y-10 opacity-100" : " -translate-y-60  opacity-0"}
        `}
        >
          <button
            onClick={onClose}
            className="absolute right-2 top-2 rounded-md bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          ></button>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
