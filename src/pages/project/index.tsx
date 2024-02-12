import { CURR_PROJECT_ID } from "data/constants";
import {
  useParams,
  useRouter,
  useSearchParams,
} from "node_modules/next/navigation";
import React, { useEffect } from "react";
import Layout from "~/components/Layout";

const Project = () => {
  const router = useRouter();
  const params = useSearchParams();
  useEffect(() => {
    if (typeof window !== "undefined" && params) {
      const id = params.get("id");
      localStorage.setItem(CURR_PROJECT_ID, id);
      router.replace("/project/list");
    }
  }, [params]);

  return;
};

export default Project;
