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
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let { id, allDetails } = input;

      let include = {};

      if (allDetails) {
        include = {
          assignees: true,
          creator: true,
        };
      }

      let projectDetails = await ctx.db.task.findUnique({
        where: { id },
        include: {
          assignees: true,
          creator: true,
        },
      });

      return projectDetails;
    }),
});
