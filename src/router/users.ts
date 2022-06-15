import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "../db/client";

export const usersRouter = trpc
  .router()
  .query("getAll", {
    async resolve() {
      return await prisma.user.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      email: z.string().email(),
      name: z.string().min(3),
    }),
    async resolve({ input }) {
      return await prisma.user.create({
        data: {
          email: input.email,
          name: input.name,
        },
      });
    },
  });
