import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { defaultPriorities, defaultStatus } from "data/constants";

export const taskMutationRouter = createTRPCRouter({
  addTask: protectedProcedure
    .input(
      z.object({
        projectId: z.string().min(1),
        title: z.string().min(1),
        description: z.optional(z.string()),
        type: z.string().min(1),
        assignee: z.optional(z.string()),
        priority: z.optional(z.string().min(1)),
        dueDate: z.optional(z.date()),
        tags: z.optional(z.array(z.string())),
        status: z.optional(z.string().min(1)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let {
        projectId,
        title,
        description,
        type,
        assignee,
        priority,
        dueDate,
        tags,
        status,
      } = input;

      const projectDetails = await ctx.db.project.findUnique({
        where: { id: projectId },
        select: {
          prefix: true,
          _count: {
            select: {
              tasks: true,
            },
          },
        },
      });

      let relativeId = (
        projectDetails.prefix +
        "-" +
        (projectDetails._count.tasks + 1)
      ).toUpperCase();

      const userId = ctx.session.user.id;
      let createObj = {
        project: { connect: { id: projectId } },
        relativeId,
        title,
        type,
        description,
        creator: { connect: { id: userId } },
      };

      if (assignee)
        createObj.assignee = {
          connect: { id: assignee },
        };
      if (priority) createObj.priority = priority;
      if (dueDate) createObj.dueDate = new Date(dueDate);
      if (tags) createObj.tags = tags;
      if (status) createObj.status = status;
      try {
        const task = await ctx.db.task.create({
          data: createObj,
        });

        return task;
      } catch (err) {
        console.log(err);
        console.log("DUE DATE", new Date(dueDate));
        return err;
      }
    }),

  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        title: z.optional(z.string().min(1)),
        description: z.optional(z.string()),
        type: z.string().min(1),
        assignee: z.optional(z.string()),
        priority: z.optional(z.string().min(1)),
        dueDate: z.optional(z.date()),
        tags: z.optional(z.array(z.string())),
        status: z.optional(z.string().min(1)),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let {
        id,
        title,
        description,
        type,
        assignee,
        priority,
        dueDate,
        tags,
        status,
      } = input;
      const userId = ctx.session.user.id;
      let updateObj = {
        title,
        type,
        description,
        creator: { connect: { id: userId } },
      };

      if (assignee)
        updateObj.assignee = {
          connect: { id: assignee },
        };
      if (priority) updateObj.priority = priority;
      if (dueDate) updateObj.dueDate = new Date(dueDate);
      if (tags) updateObj.tags = tags;
      if (status) updateObj.status = status;
      try {
        const task = await ctx.db.task.update({
          data: updateObj,
          where: { id },
        });

        return task;
      } catch (err) {
        return err;
      }
    }),
});
