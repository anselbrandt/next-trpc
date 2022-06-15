import * as trpc from "@trpc/server";
import { prisma } from "../db/client";

export const notesRouter = trpc.router().query("getAll", {
  async resolve() {
    return await prisma.note.findMany();
  },
});
