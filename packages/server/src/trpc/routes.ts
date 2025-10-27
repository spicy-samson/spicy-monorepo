import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { db } from "../firebase";
import type { Product } from "../types";
import { isAuthed } from "./middleware";
// Return: Product[]

export const appRouter = router({
  publicHello: publicProcedure.query(() => "👋 Public route!"),

  privateData: publicProcedure
    .use(isAuthed) // 🧱 Require auth here
    .query(({ ctx }) => {
      return `🔥 Secret for ${ctx.user.email}`;
    }),
  goodbye: publicProcedure.input(z.string()).query(({ input }) => {
    return {
      farewell: `Bye :( ${input}!`,
    };
  }),
  addNumbers: publicProcedure
    .input(z.object({ a: z.number(), b: z.number() }))
    .mutation(({ input }) => {
      return { sum: input.a + input.b };
    }),
  getProducts: publicProcedure.query(async () => {
    const products: Product[] = [];
    try {
      const snapshot = await db.collection("products").get();
      snapshot.forEach((doc) => {
        const data = doc.data();
        products.push({
          ...data,
          id: parseInt(doc.id) || data.id, // Use existing numeric ID or parse doc.id
        } as Product);
      });
      return products;
    } catch (error) {
      console.error("❌ Firestore connection failed:", error);
      throw new Error("Failed to fetch products");
    }
  }),

  updateProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
        price: z.number(),
        description: z.string(),
        category: z.string(),
        image: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { id, ...updateData } = input;
        await db.collection("products").doc(id.toString()).update(updateData);
        return { status: "success" };
      } catch (error) {
        console.error("Failed to update product:", error);
        throw new Error("Failed to update product");
      }
    }),

  deleteProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await db.collection("products").doc(input.id.toString()).delete();
        return { status: "success" };
      } catch (error) {
        console.error("Failed to delete product:", error);
        throw new Error("Failed to delete product");
      }
    }),

  // ...existing code...
  seedProducts: publicProcedure.mutation(async () => {
    const productsRef = db.collection("products");
    const snapshot = await productsRef.limit(1).get();

    // Only seed if collection is empty
    if (snapshot.empty) {
      const res = await fetch("https://fakestoreapi.com/products");
      const products = await res.json();
      for (const product of products) {
        await productsRef.doc(product.id.toString()).set(product);
      }
      return { status: "Seeded", count: products.length };
    } else {
      return { status: "Already seeded" };
    }
  }),

  // ...existing code...
});

export type AppRouter = typeof appRouter;
