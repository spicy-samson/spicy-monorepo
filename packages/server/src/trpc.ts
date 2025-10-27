import { initTRPC, TRPCError } from "@trpc/server";
import { getAuth } from "firebase-admin/auth";
import { firebaseApp } from "./firebase";
import type { Context } from "./trpc/context"; // import the type from your context.ts

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;


