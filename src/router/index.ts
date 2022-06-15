import * as trpc from "@trpc/server";
import superjson from "superjson";
import { notesRouter } from "./notes";
import { usersRouter } from "./users";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("notes.", notesRouter)
  .merge("users.", usersRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
