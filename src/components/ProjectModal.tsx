import React, { useEffect, useState } from "react";
import { useProject } from "~/hooks/project";
import Modal from "./Modal";

const defaultValue = {
  name: "",
  description: "",
  prefix: "",
};

const ProjectModal = () => {
  const [open, setOpen] = useState(false);
  const [projectDetails, setProjectDetails] = useState(defaultValue);

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

    console.log(projectDetails);
  };

  useEffect(() => {
    console.log("happening", updateSuccess);
    if (data) {
      console.log("Project added successfully");
      setProjectDetails(defaultValue);
      setOpen(false);
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
        onClick={() => {
          console.log("open");
          setOpen(!open);
        }}
      >
        OPEN MODAL
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
                className="font-roboto focus:ring-purple2 rounded-sm border-black text-2xl font-medium outline-none ring-2 ring-gray-200 "
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
                className="font-roboto focus:ring-purple2 w-full resize-none rounded-sm text-base outline-none ring-2 ring-gray-200"
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
                className="font-roboto focus:ring-purple2 rounded-sm border-black text-lg font-medium uppercase outline-none ring-2 ring-gray-200"
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

export default ProjectModal;
