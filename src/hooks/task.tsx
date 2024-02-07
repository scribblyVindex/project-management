import { CURR_PROJECT_ID } from "data/constants";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

export const useTask = ({ id, fetch = true }) => {
  const [taskDetails, setTaskDetails] = useState();

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

  /// --------------------------------------------------------------------------------------------------------------------

  // Creating/ Updating Task
  const {
    data: createdData,
    error: createError,
    isPending: creating,
    mutate: addTask,
  } = api.taskMutations.addTask.useMutation();

  const {
    data: updatedData,
    error: updateError,
    isPending: updating,
    mutate: updateTask,
  } = api.taskMutations.updateTask.useMutation();

  const addUpdateTaskDetails = (update: any) => {
    const { id, ...otherDetails } = update;

    const params = {
      onSuccess: (updateData: any) => {
        setTaskDetails(updateData);
      },
    };

    if (id) updateTask(update, params);
    else addTask(update, params);
  };

  return {
    id,
    taskDetails,
    isLoading,
    isSuccess,
    fetchError,

    addUpdateTaskDetails,
    error: updateError || createError,
    loading: creating || updating,
    data: createdData || updatedData,
  };
};
