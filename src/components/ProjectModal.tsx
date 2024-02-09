import React, { useState } from "react";
import Modal from "./Modal";

const ProjectModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          console.log("open");
          setOpen(!open);
        }}
      >
        OPEN MODAL
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="h-[500px] w-[500px] text-center">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-danger w-full">Delete</button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectModal;
