import { z } from "zod";
import { VerificationToken, User } from "typeDefinitions/mutationTypes";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { defaultPriorities, defaultStatus, defaultTags } from "data/constants";

export const mutationRouter = createTRPCRouter({
  addProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.optional(z.string()),
        // admins: z.optional(z.array(z.number())),
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
        tags: defaultTags,
        status: defaultStatus,
        priority: defaultPriorities,
      };
      try {
        const project = ctx.db.project.create({
          data: createObj,
        });

        return project;
      } catch (err) {
        console.log("ERROR", err);
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
      } = input;
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
      if (tag) updateObj["tags"] = { push: tag };
      if (status) updateObj["status"] = { push: status };
      if (priority) updateObj["priority"] = { push: priority };
      if (invitation) updateObj["invitations"] = { push: invitation };
      try {
        const project = ctx.db.project.update({
          data: updateObj,
          where: { id },
        });

        return project;
      } catch (err) {
        console.log("ERROR", err);
      }
    }),
});
