import { z } from "zod";
import { PostInputSchema } from ".zenstack/zod/input";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.dbe.post.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  findFirst: protectedProcedure
    .input(PostInputSchema.findFirst)
    .query(({ ctx,input }) => {return ctx.dbe.post.findFirst(input)}),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
