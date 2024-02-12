import React, { useEffect, useState } from "react";
import CreateUpdateTaskButton from "~/components/CreateUpdateTaskButton";
import DatePicker from "~/components/DatePicker";
import Layout from "~/components/Layout";
import ProjectModal from "~/components/ProjectModal";
import StatusSelectInput from "~/components/SelectInput";
import StatusToast from "~/components/StatusToast";
import TaskList from "~/components/TaskList";
import { useProject } from "~/hooks/project";
import { useTask } from "~/hooks/task";
import { FaPlus } from "react-icons/fa";
import { usePathname } from "node_modules/next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const defaultValue = {
  title: "", // required
  description: "",
  type: "", // required
  assignees: [],
  priority: "",
  dueDate: "",
  status: "",
};

const List = () => {
  const [taskList, setTaskList] = useState([]);
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState(false);
  const { tasks, fetchingAllTasks, successFetching, errorFetching, allTasks } =
    useTask({ fetchAll: true });

  useEffect(() => {
    if (allTasks.length) setTaskList(allTasks);
  }, [allTasks]);
  useEffect(() => {
    if (!open) setTask();
  }, [open]);
  const pathname = usePathname();

  const handleClick = (task) => {
    setTask(task);
    setOpen(!open);
  };

  return (
    <AnimatePresence>
      <motion.div
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        className=" mx-3 my-3 h-full"
      >
        <div className="h-auto bg-white"></div>
        {taskList && <TaskList handleClick={handleClick} tasks={taskList} />}
        <button
          onClick={() => setOpen(!open)}
          className={`absolute bottom-16 right-16 z-10 flex h-16  w-16  items-center justify-center rounded-full bg-white text-4xl  shadow-md  `}
        >
          <FaPlus
            size={20}
            title={"Create Task"}
            className={`${open ? "-rotate-135" : ""} text-purple2 transition-all duration-500 `}
          />
        </button>
        <CreateUpdateTaskButton
          open={open}
          setOpen={setOpen}
          originalTaskDetails={task || defaultValue}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default List;
