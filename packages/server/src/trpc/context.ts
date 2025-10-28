import { inferAsyncReturnType } from "@trpc/server";
import { CreateHTTPContextOptions } from "@trpc/server/adapters/standalone";
import { adminAuth, db } from "../firebase"; // your firebase-admin setup
import type { FastifyRequest, FastifyReply } from "fastify";
import type { DecodedIdToken } from "firebase-admin/auth";

export async function createContext({
  req,
  res,
}: {
  req: FastifyRequest;
  res: FastifyReply;
}) {
  let user = null;
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const idToken = authHeader.split(" ")[1];
    try {
      const decoded = await adminAuth.verifyIdToken(idToken);
      // Fetch user doc from Firestore
      const userDoc = await db.collection("users").doc(decoded.uid).get();
      const userData = (userDoc.exists ? userDoc.data() : {}) as {
        role?: string;
      };
      user = {
        uid: decoded.uid,
        email: decoded.email,
        role: userData.role || "customer",
      };
    } catch (err) {
      console.warn("Invalid Firebase token:", err);
    }
  }

  return { user };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
