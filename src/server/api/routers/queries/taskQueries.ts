import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const taskQueryRouter = createTRPCRouter({
  getTaskDetails: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let { id, allDetails } = input;

      let include = {};

      if (allDetails) {
        include = {
          assignee: true,
          creator: true,
        };
      }

      let projectDetails = await ctx.db.task.findUnique({
        where: { id },
        include: {
          assignee: true,
          creator: true,
        },
      });

      return projectDetails;
    }),

  getAllTasks: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let { projectId } = input;

      let allTasks = await ctx.db.task.findMany({
        where: { project: { id: projectId } },
        include: {
          assignee: {
            select: {
              name: true,
            },
          },
          creator: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      return allTasks;
    }),
});
