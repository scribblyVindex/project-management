import { useRouter } from "node_modules/next/navigation";
import React, { useEffect, useState } from "react";
import { useProject } from "~/hooks/project";
import Modal from "./Modal";

const defaultValue = {
  name: "",
  description: "",
  prefix: "",
};

const TaskModal = ({ buttonProps }) => {
  const [open, setOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(defaultValue);
  const router = useRouter();

  const handleChange = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  const { addUpdateProjectDetails, error, loading, data, updateSuccess } =
    useProject({ fetch: false });

  const validateForm = () => {
    let error = {};
    const { name, description, prefix } = projectDetails;

    if (name.length <= 0) error.name = "Name is required";
    if (description.length <= 0) error.description = "Description is required";
    if (prefix.length <= 0) error.prefix = "Tag is required";

    let valid = Object.keys(error).length == 0;
    if (!valid) alert("Please fill in all fields");
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    let { name, description, prefix } = projectDetails;

    let updateObject = {
      name,
      description,
      prefix: prefix.toUpperCase(),
    };

    addUpdateProjectDetails(updateObject);
  };

  useEffect(() => {
    if (data) {
      setProjectDetails(defaultValue);
      setOpen(false);
      router.refresh();
    }
    if (error) setOpen(false);
  }, [updateSuccess, data, error]);

  const staticData = {
    id: "id1",
    relativeId: "P1-1",
  };
  return (
    <div>
      <button
        {...buttonProps}
        className="text-purple3 font-lato w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
        onClick={() => {
          setOpen(!open);
        }}
      >
        Create Task
      </button>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setProjectDetails(defaultValue);
        }}
      >
        <div className="flex h-[500px] w-[500px] flex-col items-start space-y-10 text-center">
          <h1 className="font-lato text-3xl font-semibold text-slate-600">
            Create Project
          </h1>
          <div className=" w-full space-y-10">
            <div className="flex flex-col items-start space-y-2 border-black">
              <p className="font-roboto border-black text-sm font-semibold text-slate-600">
                Project Name
              </p>
              <input
                type="text"
                className="font-roboto focus:ring-purple2 rounded-sm border-black text-2xl font-medium text-slate-800 outline-none ring-2 ring-gray-200 "
                onChange={handleChange}
                value={projectDetails.name}
                type="text"
                name="name"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 border-black">
              <p className="font-roboto border-black text-sm font-semibold text-slate-600">
                Project Description
              </p>
              <textarea
                className=" font-roboto focus:ring-purple2 w-full resize-none rounded-sm text-base font-medium text-slate-800 outline-none ring-2 ring-gray-200"
                rows={5}
                onChange={handleChange}
                value={projectDetails.description}
                name="description"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 border-black">
              <p className="font-roboto border-black text-sm font-semibold text-slate-600">
                Project Key
              </p>
              <input
                className=" font-roboto focus:ring-purple2 rounded-sm border-black text-lg font-medium uppercase text-slate-800 outline-none ring-2 ring-gray-200"
                onChange={handleChange}
                type="text"
                value={projectDetails.prefix}
                name="prefix"
                disabled={loading}
              />
            </div>
            <div className="flex  justify-between border-black">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className=" font-lato rounded border-black bg-slate-100 p-2 px-4 text-lg text-slate-600 transition-all  duration-200 hover:bg-slate-600 hover:text-white"
              >
                {" "}
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
                className=" font-lato  text-purple2 hover:bg-purple2 rounded border-black bg-indigo-100 p-2 px-4 text-lg transition-all duration-200 hover:text-white"
              >
                {" "}
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskModal;
