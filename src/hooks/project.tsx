import { CURR_PROJECT_ID } from "data/constants";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

export const useProject = ({ fetch = true }) => {
  const [projectId, setProjectId] = useState<string>();
  const [projectDetails, setProjectDetails] = useState();

  // if (typeof window !== "undefined") {
  //   localStorage.setItem(CURR_PROJECT_ID, "project_1");
  // }

  // Fetching project details
  const {
    data,
    isLoading,
    isSuccess,
    error: fetchError,
  } = api.projectQueries.getProjectDetails.useQuery(
    { id: projectId, allDetails: true },
    { enabled: !!projectId },
  );

  // Fetching Project Details
  useEffect(() => {
    if (fetch) {
      let projectId;
      if (typeof window !== "undefined") {
        projectId = localStorage.getItem(CURR_PROJECT_ID);
      }

      if (projectId) {
        setProjectId(projectId);
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      setProjectDetails(data);
    }
  }, [data]);

  /// --------------------------------------------------------------------------------------------------------------------

  // Creating/ Updating Project
  const {
    data: createdData,
    error: createError,
    isPending: creating,
    mutate: addProject,
  } = api.projectMutations.addProject.useMutation();

  const {
    data: updatedData,
    error: updateError,
    isPending: updating,
    mutate: updateProject,
  } = api.projectMutations.updateProject.useMutation();

  const addUpdateProjectDetails = (update: any) => {
    const { id, ...otherDetails } = update;

    const params = {
      onSuccess: (updateData: any) => {
        setProjectDetails(updateData);
      },
    };

    if (id) updateProject(update, params);
    else addProject(update, params);
  };

  return {
    projectId,
    projectDetails,

    isLoading,
    isSuccess,
    fetchError,

    addUpdateProjectDetails,
    error: updateError || createError,
    loading: creating || updating,
    data: createdData || updatedData,
  };
};
