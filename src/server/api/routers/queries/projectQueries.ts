import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const projectQueryRouter = createTRPCRouter({
  getProjectDetails: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        allDetails: z.boolean(),
      }),
    )
    .query(async ({ ctx, input }) => {
      let { id, allDetails } = input;

      let include = {};

      if (allDetails) {
        include = {
          admins: true,
          members: true,
          createdBy: true,
          tasks: true,
        };
      }

      let projectDetails;
      try {
        projectDetails = await ctx.db.project.findUnique({
          where: { id },
          include,
        });
      } catch (error) {
        console.log(error);
        console.log("ERROR IS HERE");
        console.log(id);
      }

      return projectDetails;
    }),
  getAllProjects: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    let userDetails = await ctx.db.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        projects: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    const allProjects = userDetails.projects;

    return allProjects;
  }),
});
