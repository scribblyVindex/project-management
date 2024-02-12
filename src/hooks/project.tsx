import { CURR_PROJECT_ID } from "data/constants";
import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

export const useProject = ({ fetch = true, fetchAll = false }) => {
  const [projectId, setProjectId] = useState<string>();
  const [projectDetails, setProjectDetails] = useState();
  const [allProjects, setAllProjects] = useState([]);
  const [fetchProjects, setFetchProjects] = useState(fetchAll);

  // if (typeof window !== "undefined") {
  //   localStorage.setItem(CURR_PROJECT_ID, "project_1");
  // }

  // Fetching project details
  const {
    data: userProjects,
    isLoading: fetchingAll,
    isSuccess: fetchedAll,
    error: fetchAllError,
  } = api.projectQueries.getAllProjects.useQuery(
    {},
    {
      enabled: !!fetchProjects,
    },
  );
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

  useEffect(() => {
    let a = "ok";
  }, [fetch]);

  // Fetching Project Details
  useEffect(() => {
    console.log("remounting");
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
  useEffect(() => {
    if (userProjects) {
      setAllProjects(userProjects);
      setFetchProjects(false);
    }
  }, [userProjects]);

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
    isSuccess: updateSuccess,
  } = api.projectMutations.updateProject.useMutation();

  useEffect(() => {
    if (updatedData) {
      setProjectDetails(updatedData);
    }
    if (createdData) {
      setProjectDetails(createdData);
    }
    setFetchProjects(true);
  }, [updatedData, createdData]);

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

    allProjects,
    fetchingAll,
    fetchedAll,
    fetchAllError,

    addUpdateProjectDetails,
    error: updateError || createError,
    loading: creating || updating,
    data: createdData || updatedData,
    updateSuccess,
  };
};
