import React, { useEffect, useState } from "react";
import { useDashboard } from "~/hooks/dashboard";

const Dashboard = () => {
  const {
    dashboardDetails: data,
    isLoading,
    isSuccess,
    fetchError,
  } = useDashboard();
  const [dashboardDetails, setDashboardDetails] = useState();

  useEffect(() => {
    if (data) {
      setDashboardDetails(data);
      console.log(data);
    }
  }, [data]);

  return <div>HERE IS DASHBOARD</div>;
};

export default Dashboard;
