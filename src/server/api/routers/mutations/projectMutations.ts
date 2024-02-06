import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  defaultPriorities,
  defaultStatus,
  defaultTaskTypes,
} from "data/constants";

export const projectMutationRouter = createTRPCRouter({
  addProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.optional(z.string()),
        prefix: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let { name, description, prefix } = input;
      const userId = ctx.session.user.id;
      let createObj = {
        name,
        prefix,
        description,
        createdBy: { connect: { id: userId } },
        admins: { connect: { id: userId } },
        taskTypes: defaultTaskTypes,
        status: defaultStatus,
        priority: defaultPriorities,
      };
      try {
        const project = await ctx.db.project.create({
          data: createObj,
        });

        return project;
      } catch (err) {
        return err;
      }
    }),

  updateProject: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.optional(z.string().min(1)),
        description: z.optional(z.string()),
        admins: z.optional(z.array(z.string())),
        members: z.optional(z.array(z.string())),
        taskType: z.optional(z.string().min(1)),
        tag: z.optional(z.string().min(1)),
        status: z.optional(z.string().min(1)),
        priority: z.optional(z.string().min(1)),
        invitation: z.optional(z.string().email()),
        prefix: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      let {
        id,
        name,
        description,
        prefix,
        admins,
        members,
        tag,
        status,
        priority,
        invitation,
        taskType,
      } = input;

      const projectDetails = await ctx.db.project.findUnique({
        where: { id },
        include: {
          admins: true,
        },
      });

      let projectAdmins = (projectDetails?.admins || []).map(
        (admin: any) => admin.id,
      );
      const userId = ctx.session.user.id;

      if (!projectAdmins.includes(userId)) throw new Error("Unauthorized");

      let updateObj = {
        name,
        prefix,
        description,
      };
      if (admins && admins.length)
        updateObj["admins"] = { connect: admins.map((id: string) => ({ id })) };
      if (admins && admins.length)
        updateObj["members"] = {
          connect: members.map((id: string) => ({ id })),
        };
      if (taskType && !projectDetails.taskTypes.includes(taskType))
        updateObj["taskTypes"] = { push: taskType };
      if (tag && !projectDetails.tags.includes(tag))
        updateObj["tags"] = { push: tag };
      if (status && !projectDetails.status.includes(status))
        updateObj["status"] = { push: status };
      if (priority && !projectDetails.priority.includes(priority))
        updateObj["priority"] = { push: priority };
      if (invitation && !projectDetails.invitations.includes(invitation))
        updateObj["invitations"] = { push: invitation };
      updateObj.updatedAt = new Date();
      try {
        const project = await ctx.db.project.update({
          data: updateObj,
          where: { id },
        });

        return project;
      } catch (err) {
        return err;
      }
    }),
});
