import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userQueryRouter = createTRPCRouter({
  getDashboardDetails: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      const userDetails = await ctx.db.user.findUnique({
        where: { id: userId },
        include: {
          projects: {
            include: {
              admins: true,
              members: true,
            },
          },
          projectAdmin: {
            include: {
              admins: true,
              members: true,
            },
          },
          tasksAssigned: true,
        },
      });

      console.log(userDetails);
      const collaboratorIds: String[] = [];
      userDetails.projects.map((project: any) => {
        if (project.members)
          project.members.map((user: any) => {
            if (userId !== user.id && !collaboratorIds.includes(user.id)) {
              collaboratorIds.push(user.id);
            }
          });
        if (
          project.admins &&
          project.admins.filter((user: any) => user.id !== userId).length > 0
        )
          project.admins.map((user: any) => {
            if (userId !== user.id && !collaboratorIds.includes(user.id)) {
              collaboratorIds.push(user.id);
            }
          });
      });
      userDetails.projectAdmin.map((project: any) => {
        if (project.members)
          project.members.map((user: any) => {
            if (userId !== user.id && !collaboratorIds.includes(user.id)) {
              collaboratorIds.push(user.id);
            }
          });
        if (
          project.admins &&
          project.admins.filter((user: any) => user.id !== userId).length > 0
        )
          project.admins.map((user: any) => {
            if (userId !== user.id && !collaboratorIds.includes(user.id)) {
              collaboratorIds.push(user.id);
            }
          });
      });
      const collaborators = await ctx.db.user.findMany({
        where: {
          id: { in: collaboratorIds },
        },
      });
      const tasks = userDetails.tasksAssigned;
      const projects = userDetails.projects.concat(userDetails.projectAdmin);

      return { collaborators, tasks, projects };
    } catch (error) {
      return error;
    }
  }),
  getDashboardDetails: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    try {
      const userDetails = await ctx.db.user.findUnique({
        where: { id: userId },
        include: {
          projects: {
            include: {
              admins: true,
              members: true,
            },
          },
          projectAdmin: {
            include: {
              admins: true,
              members: true,
            },
          },
          tasksAssigned: true,
        },
      });

      console.log(userDetails);
      const collaboratorIds: String[] = [];
      userDetails.projects.map((project: any) => {
        if (project.members)
          project.members.map((user: any) => {
            if (userId !== user.id && !collaboratorIds.includes(user.id)) {
              collaboratorIds.push(user.id);
            }
          });
        if (
          project.admins &&
          project.admins.filter((user: any) => user.id !== userId).length > 0
        )
          project.admins.map((user: any) => {
            if (userId !== user.id && !collaboratorIds.includes(user.id)) {
              collaboratorIds.push(user.id);
            }
          });
      });
      userDetails.projectAdmin.map((project: any) => {
        if (project.members)
          project.members.map((user: any) => {
            if (userId !== user.id && !collaboratorIds.includes(user.id)) {
              collaboratorIds.push(user.id);
            }
          });
        if (
          project.admins &&
          project.admins.filter((user: any) => user.id !== userId).length > 0
        )
          project.admins.map((user: any) => {
            if (userId !== user.id && !collaboratorIds.includes(user.id)) {
              collaboratorIds.push(user.id);
            }
          });
      });
      const collaborators = await ctx.db.user.findMany({
        where: {
          id: { in: collaboratorIds },
        },
      });
      const tasks = userDetails.tasksAssigned;
      const projects = userDetails.projects.concat(userDetails.projectAdmin);

      return { collaborators, tasks, projects };
    } catch (error) {
      return error;
    }
  }),
});
