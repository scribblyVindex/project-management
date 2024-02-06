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
        assignees: z.optional(z.array(z.string())),
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
        assignees,
        priority,
        dueDate,
        tags,
        status,
      } = input;
      const userId = ctx.session.user.id;
      let createObj = {
        project: { connect: { id: projectId } },
        title,
        type,
        description,
        creator: { connect: { id: userId } },
      };

      if (assignees)
        createObj.assignedTo = {
          connect: assignees.map((userId) => ({ id: userId })),
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
        return err;
      }
    }),

  updateTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.optional(z.string().min(1)),
        description: z.optional(z.string()),
        type: z.string().min(1),
        assignees: z.optional(z.array(z.string())),
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
        assignees,
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

      if (assignees)
        updateObj.assignedTo = {
          connect: assignees.map((userId) => ({ id: userId })),
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
