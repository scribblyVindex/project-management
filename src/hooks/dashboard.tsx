import React, { useEffect, useState } from "react";
import { api } from "~/utils/api";

export const useDashboard = () => {
  const [dashboardDetails, setDashboardDetails] = useState();

  // Fetch dashboard details
  const {
    data,
    isLoading,
    isSuccess,
    error: fetchError,
  } = api.userQueries.getDashboardDetails.useQuery();

  useEffect(() => {
    if (data) {
      setDashboardDetails(data);
    }
  }, [data]);

  return {
    dashboardDetails,
    isLoading,
    isSuccess,
    fetchError,
  };
};
