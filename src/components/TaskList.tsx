import React from "react";
import { capitalise } from "~/utils/helpers";

const TaskList = ({ tasks = [], handleClick = () => {} }) => {
  return (
    <section className="bg-blueGray-50 h-full ">
      <div className="   mb-12 h-full w-full xl:mb-0 xl:w-full">
        <div className="relative mb-6 flex h-full w-full min-w-0 flex-col break-words rounded bg-white shadow-lg ">
          <div className="mb-0 rounded-t border-0  py-3">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                <h3 className="text-base font-semibold text-purple3">
                  Task list
                </h3>
              </div>
              {/* <div className="relative w-full max-w-full flex-1 flex-grow px-4 text-right">
                <button
                  className="mb-1 mr-1 rounded bg-indigo-500 px-3 py-1 text-xs font-bold uppercase text-white outline-none transition-all duration-150 ease-linear focus:outline-none active:bg-indigo-600"
                  type="button"
                >
                  See all
                </button>
              </div> */}
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="w-full border-collapse items-center bg-transparent ">
              <thead>
                <tr>
                  <th className="bg-blueGray-50 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-purple2">
                    Key
                  </th>
                  <th className="bg-blueGray-50 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-purple2">
                    Title
                  </th>
                  <th className="bg-blueGray-50 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-purple2">
                    Creator
                  </th>

                  <th className="bg-blueGray-50 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-purple2">
                    Assignee
                  </th>
                  <th className="bg-blueGray-50 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-purple2">
                    Status
                  </th>
                  <th className="bg-blueGray-50 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-purple2">
                    Priority
                  </th>
                  <th className="bg-blueGray-50 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-purple2">
                    Due Date
                  </th>

                  <th className="bg-blueGray-50 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase text-purple2">
                    Created on
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks?.map((task, index) => {
                  const {
                    relativeId,
                    title,
                    creator,
                    assignee,
                    status,
                    priority,
                    dueDate,
                    createdAt,
                  } = task;

                  return (
                    <tr
                      onClick={() => handleClick(task)}
                      className="cursor-pointer hover:bg-gray-100"
                    >
                      <th className="text-blueGray-700 whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-xs ">
                        {relativeId}
                      </th>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs ">
                        {title}
                      </td>
                      <td className="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-xs">
                        {creator?.name}
                      </td>
                      <td className="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-xs">
                        {assignee?.name}
                      </td>
                      <td className="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-xs">
                        {capitalise(status)}
                      </td>
                      <td className="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-xs">
                        {capitalise(priority)}
                      </td>
                      <td className="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-xs">
                        {dueDate?.toISOString()}
                      </td>
                      <td className="align-center whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-xs">
                        {createdAt?.toISOString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskList;
