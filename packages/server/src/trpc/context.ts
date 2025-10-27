import { inferAsyncReturnType } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { adminAuth } from "../firebase"; // your firebase-admin setup
import type { FastifyRequest, FastifyReply } from "fastify";
import type { DecodedIdToken } from "firebase-admin/auth";

export async function createContext({
  req,
  res,
}: {
  req: FastifyRequest;
  res: FastifyReply;
}) {
  let user: DecodedIdToken | null = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const idToken = authHeader.split(" ")[1];
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      user = decoded;
    } catch (err) {
      console.warn("Invalid Firebase token:", err);
    }
  }

  return { user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
