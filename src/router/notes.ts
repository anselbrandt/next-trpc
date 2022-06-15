import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../db/client";

export const notesRouter = trpc
  .router()
  .query("getAll", {
    async resolve() {
      return await prisma.note.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string().min(1).max(255),
      content: z.string().max(5000),
      authorId: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.note.create({
        data: {
          title: input.title,
          content: input.content,
          author: {
            connect: {
              id: input.authorId,
            },
          },
        },
      });
    },
  });
