import { signIn, signOut, useSession } from "next-auth/react";
import Head from "node_modules/next/head";
import Link from "node_modules/next/link";
import { useEffect, useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

import Navbar from "~/components/Navbar";
import { useProject } from "~/hooks/project";

import { api } from "~/utils/api";
import Layout from "~/components/Layout";
import ProjectModal from "~/components/ProjectModal";
import { useTask } from "~/hooks/task";
import Avatar from "~/components/Avatar";
import UserSelectInput from "~/components/UserSelectInput";
import TaskPriorityInput from "~/components/TaskPriorityInput";
// 576aa3a8dc
export default function Home() {
  const editorRef = useRef(null);

  const { data: sessionData } = useSession();

  // const { addUpdateTaskDetails, data } = useTask({});

  // let updateObj = {
  //   projectId: "project_1",
  //   title: "test task 1 for project 1",
  //   type: "bug",
  // };

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  return (
    <>
      {/* <ProjectModal /> */}
      {/* <button onClick={() => addUpdateTaskDetails(updateObj)}>
        ADD TASK HEREEEEE
      </button> */}

      {/* <Link href={"/project"}>TO PROJECT</Link> */}

      {/* <Editor
            apiKey="yivzkn19wx3bgafhotfwnn0w1o626yudu2d29gqjk3l9okxv"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            value={text}
            onEditorChange={(e) => setText(e)}
            init={{
              height: 500,
              menubar: false,
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
          /> */}
      <ProjectModal />

      {/* <AuthShowcase /> */}
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-black text-white no-underline transition hover:bg-white/20"
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </button>
      </div>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
