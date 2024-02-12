import { usePathname, useRouter } from "node_modules/next/navigation";
import React, { useEffect, useState } from "react";
import Layout from "~/components/Layout";
import Modal from "~/components/Modal";
import { useDashboard } from "~/hooks/dashboard";

const Dashboard = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setOpen(!open);
        }}
      >
        OPEN MODAL
      </button>

      {/* <div className="h-[50vh] w-[50vh] bg-red-400"></div> */}

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
    </>
  );
};

export default Dashboard;
