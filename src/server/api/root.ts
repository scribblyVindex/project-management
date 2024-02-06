import { createTRPCRouter } from "~/server/api/trpc";
import { mutationRouter } from "./routers/mutations";
import { queryRouter } from "./routers/queries";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mutations: mutationRouter,
  queries: queryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
