import { CURR_PROJECT_ID } from "data/constants";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

export const useTask = ({ id, fetch = true, fetchAll = false }) => {
  const [taskDetails, setTaskDetails] = useState();
  const [projectId, setProjectId] = useState();
  const [fetchAllTasks, setFetchAllTasks] = useState(fetchAll);
  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    if (window !== undefined) {
      let project = localStorage.getItem(CURR_PROJECT_ID);
      setProjectId(project);
    }
  }, []);

  // Fetching task details
  const {
    data,
    isLoading,
    isSuccess,
    error: fetchError,
  } = api.taskQueries.getTaskDetails.useQuery({ id }, { enabled: !!id });

  useEffect(() => {
    if (data) {
      setTaskDetails(data);
    }
  }, [data]);

  const {
    data: tasks,
    isLoading: fetchingAllTasks,
    isSuccess: successFetching,
    error: errorFetching,
  } = api.taskQueries.getAllTasks.useQuery(
    { projectId },
    { enabled: fetchAllTasks },
  );

  useEffect(() => {
    if (fetchAll && projectId) {
      setFetchAllTasks(true);
    }
  }, []);

  useEffect(() => {
    if (tasks) {
      setAllTasks(tasks);
      setFetchAllTasks(false);
    }
  }, [tasks]);

  /// --------------------------------------------------------------------------------------------------------------------

  // Creating/ Updating Task
  const {
    data: createdData,
    error: createError,
    isPending: creating,
    mutate: addTask,
    isSuccess: successCreate,
  } = api.taskMutations.addTask.useMutation();

  const {
    data: updatedData,
    error: updateError,
    isPending: updating,
    mutate: updateTask,
    isSuccess: successUpdate,
  } = api.taskMutations.updateTask.useMutation();

  useEffect(() => {
    if (updatedData) {
      setTaskDetails(updatedData);
    }
    if (createdData) {
      setTaskDetails(createdData);
    }
    setFetchAllTasks(true);
  }, [updatedData, createdData]);

  const addUpdateTaskDetails = (update: any) => {
    const { id, ...otherDetails } = update;

    if (projectId) {
      update.projectId = projectId;

      const params = {
        onSuccess: (updateData: any) => {
          setTaskDetails(updateData);
        },
      };

      if (id) updateTask(update, params);
      else addTask(update, params);
    }
  };

  return {
    id,
    taskDetails,
    isLoading,
    isSuccess,
    fetchError,

    tasks,
    fetchingAllTasks,
    successFetching,
    errorFetching,
    allTasks,

    addUpdateTaskDetails,
    error: updateError || createError,
    loading: creating || updating,
    data: createdData || updatedData,
    success: successCreate || successUpdate,
  };
};
