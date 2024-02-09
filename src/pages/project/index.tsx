import { CURR_PROJECT_ID } from "data/constants";
import { useRouter } from "node_modules/next/navigation";
import React, { useEffect } from "react";
import Layout from "~/components/Layout";

const Project = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CURR_PROJECT_ID, "project_1");
      router.replace("/project/list");
    }
  }, []);

  return <>Project</>;
};

export default Project;
