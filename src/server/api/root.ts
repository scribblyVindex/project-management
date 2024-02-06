import { createTRPCRouter } from "~/server/api/trpc";
import { projectMutationRouter } from "./routers/mutations/projectMutations";
import { taskMutationRouter } from "./routers/mutations/taskMutations";
import { projectQueryRouter } from "./routers/queries/projectQueries";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  projectMutations: projectMutationRouter,
  projectQueries: projectQueryRouter,

  taskMutations: taskMutationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
