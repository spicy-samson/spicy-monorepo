import { t } from "../trpc"; // your tRPC init (like `export const t = initTRPC.context<Context>().create()`)
import { TRPCError } from "@trpc/server";

export const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in.",
    });
  }

  return next({
    ctx: {
      user: ctx.user, // forward the user to downstream resolvers
    },
  });
});

export const isAdmin = t.middleware(({ ctx, next }) => {
  console.log(ctx.user);
  if (!ctx.user || ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admins only" });
  }
  return next();
});
