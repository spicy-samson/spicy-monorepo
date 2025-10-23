import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello, hope you are having a good day, ${input.name}!`,
      };
    }),
  goodbye: t.procedure.input(z.string()).query(({ input }) => {
    return {
      farewell: `Bye :( ${input}!`,
    };
  }),
});

export type AppRouter = typeof appRouter;
