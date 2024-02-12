import AppContext from "context/AppContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useProject } from "~/hooks/project";
import { useTask } from "~/hooks/task";
import { capitalise } from "~/utils/helpers";
import Modal from "./Modal";
import { Editor } from "@tinymce/tinymce-react";
import DatePicker from "./DatePicker";
import SelectInput from "./SelectInput";
import { defaultTaskTypes } from "data/constants";
import { useRouter } from "node_modules/next/router";
import UserSelectInput from "./UserSelect";

const defaultValue = {
  title: "", // required
  description: "",
  type: "", // required
  assignees: [],
  priority: "",
  dueDate: "",
  status: "",
};

const CreateUpdateTaskButton = ({
  open = false,
  setOpen,
  originalTaskDetails,
  // project,
}) => {
  //   const [open, setOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState();
  const [projectDetails, setProjectDetails] = useState();
  const [fetch, setFetch] = useState(true);
  const router = useRouter();
  const context = useContext(AppContext);
  const { setOpen: setToastOpen, setStatus } = context;
  const editorRef = useRef(null);

  const { addUpdateTaskDetails, error, loading, data, success } = useTask({});

  const { projectDetails: project, isLoading } = useProject({ fetch });

  const handleChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (project) setProjectDetails(project);
  }, [project]);

  useEffect(() => {
    setFetch(true);
  }, [open]);

  useEffect(() => {
    if (originalTaskDetails) {
      console.log(originalTaskDetails);
      setTaskDetails(originalTaskDetails);
    }
  }, [originalTaskDetails]);

  const validateForm = () => {
    let error = {};

    const { title, type, ...otherDetails } = taskDetails;

    if (title.length <= 0) error.name = "Title is required";
    if (type.length <= 0) error.prefix = "Type is required";

    let valid = Object.keys(error).length == 0;
    if (!valid) alert("Please fill in all fields");
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    let { id, title, description, type, assignee, priority, dueDate, status } =
      taskDetails;

    let updateObj = {
      title,
      type,
    };
    if (id) updateObj.id = id;
    if (description) updateObj.description = description;
    if (dueDate) updateObj.dueDate = dueDate;
    if (priority) updateObj.priority = priority;
    if (status) updateObj.status = status;
    if (assignee && assignee.id) updateObj.assignee = assignee.id;

    console.log("updateObj", updateObj);

    addUpdateTaskDetails(updateObj);
  };

  useEffect(() => {
    if (success) {
      setTaskDetails(defaultValue);
      setOpen(false);
      setToastOpen(true);
      setStatus({ success: true, message: "Task created successfully" });
      // router.reload();
    }
    if (error) {
      setOpen(false);
      setToastOpen(true);
      setStatus({
        success: false,
        message: "Task creation unsuccessful",
      });
    }
  }, [data, error]);

  return (
    <div className="z-7 ">
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setTaskDetails();
        }}
      >
        <div className="   flex h-[70vh] w-[40vw] flex-col    text-center">
          <div className="w-full border-b-2 border-gray-200  px-6 py-4">
            <h1 className="font-poppins text-start text-2xl font-medium text-slate-800  ">
              {`${taskDetails?.id ? "Update" : "Create"}` + " Task"}
            </h1>
          </div>
          <div className=" relative flex w-full flex-col items-start space-y-10 overflow-scroll   border-black  p-4 px-8">
            <div className="flex flex-col items-start space-y-2 border-black">
              <p className="border-black font-roboto text-sm font-semibold text-slate-600">
                Project
              </p>
              <div className="w-auto min-w-60 rounded-sm border-black p-2 text-left font-roboto text-2xl font-medium text-purple3 outline-none ring-2 ring-gray-200 focus:ring-purple2 ">
                {project?.name ? capitalise(project.name) : "Project name"}
              </div>
            </div>
            <div className="flex flex-col items-start space-y-2 border-black">
              <p className="border-black font-roboto text-sm font-semibold text-slate-600">
                Task title
              </p>
              <input
                type="text"
                className="rounded-sm border-black font-roboto text-2xl font-medium text-slate-800 outline-none ring-2 ring-gray-200 focus:ring-purple2 "
                onChange={(e) => {
                  setTaskDetails({ ...taskDetails, title: e.target.value });
                }}
                value={taskDetails?.title}
                name="title"
                disabled={loading}
              />
            </div>
            <div className="flex flex-col items-start space-y-2 border-black">
              <p className="border-black font-roboto text-sm font-semibold text-slate-600">
                Task Type
              </p>
              <SelectInput
                modalOpen={open}
                selectedOption={taskDetails?.type}
                optionsList={projectDetails?.taskTypes}
                setSelectedOption={(type) =>
                  setTaskDetails({ ...taskDetails, type })
                }
                inputType="type"
              />
            </div>
            <div className="flex w-full flex-col items-start space-y-2 border-black">
              <p className="border-black font-roboto text-sm font-semibold text-slate-600">
                Task Description
              </p>
              <Editor
                apiKey="yivzkn19wx3bgafhotfwnn0w1o626yudu2d29gqjk3l9okxv"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue=""
                value={taskDetails?.description}
                onEditorChange={(e) =>
                  setTaskDetails({
                    ...taskDetails,
                    description: e,
                  })
                }
                init={{
                  height: 300,
                  menubar: false,
                  resize: false,
                  placeholder: "Please describe the task",
                  plugins: [
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
            </div>

            <div className="flex flex-col items-start space-y-2 border-black">
              <p className="border-black font-roboto text-sm font-semibold text-slate-600">
                Due Date
              </p>
              <DatePicker
                value={taskDetails?.dueDate}
                setValue={(dueDate) => {
                  setTaskDetails({ ...taskDetails, dueDate });
                }}
              />
            </div>

            <div className="  flex flex-col items-start space-y-2 border-black">
              <p className="border-black font-roboto text-sm font-semibold text-slate-600">
                Status
              </p>
              <SelectInput
                modalOpen={open}
                inputType="status"
                selectedOption={taskDetails?.status}
                optionsList={projectDetails?.status}
                setSelectedOption={(status) =>
                  setTaskDetails({ ...taskDetails, status })
                }
              />
            </div>
            <div>
              <div className="top-0 flex flex-col items-start space-y-2 border-black">
                <p className="border-black font-roboto text-sm font-semibold text-slate-600">
                  Priority
                </p>
                <SelectInput
                  modalOpen={open}
                  inputType="priority"
                  selectedOption={taskDetails?.priority}
                  optionsList={projectDetails?.priority}
                  setSelectedOption={(priority) =>
                    setTaskDetails({ ...taskDetails, priority })
                  }
                />
              </div>
            </div>
            <div>
              <div className="top-0 flex flex-col items-start space-y-2 border-black">
                <p className="border-black font-roboto text-sm font-semibold text-slate-600">
                  Priority
                </p>
                <UserSelectInput
                  modalOpen={open}
                  inputType="priority"
                  selectedUser={taskDetails?.assignee}
                  usersList={projectDetails?.members}
                  setSelectedUser={(assignee) =>
                    setTaskDetails({ ...taskDetails, assignee: assignee })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-between border-t-2 border-gray-200 px-10  py-4 ">
            <button
              disabled={loading}
              onClick={() => {
                setOpen(false);
                setTaskDetails(originalTaskDetails);
              }}
              className=" rounded border-black bg-slate-100 p-2 px-4 font-lato text-lg text-slate-600 transition-all  duration-200 hover:bg-slate-600 hover:text-white"
            >
              {" "}
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleSubmit}
              className=" rounded  border-black bg-indigo-100 p-2 px-4 font-lato text-lg text-purple2 transition-all duration-200 hover:bg-purple2 hover:text-white"
            >
              {" "}
              {taskDetails?.id ? "Save Changes" : "Add Task"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreateUpdateTaskButton;
