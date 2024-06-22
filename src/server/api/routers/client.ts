import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { ClientInputSchema } from ".zenstack/zod/input";

export const clientRouter = createTRPCRouter({
    findMany: protectedProcedure.input(ClientInputSchema.findMany).query(({ ctx, input }) => {
        return ctx.dbe.client.findMany(input)}),

    findFirst: protectedProcedure.input(ClientInputSchema.findFirst).query(({ ctx, input }) => {
        return ctx.dbe.client.findFirst(input)}),
    
    create: protectedProcedure.input(ClientInputSchema.create).mutation(({ ctx, input }) => {
        return ctx.dbe.client.create(input)}),
    
    update: protectedProcedure.input(ClientInputSchema.update).mutation(({ ctx, input }) => {
        return ctx.dbe.client.update(input)}),
    
    delete: protectedProcedure.input(ClientInputSchema.delete).mutation(({ ctx, input }) => {
        return ctx.dbe.client.delete(input)}),
})