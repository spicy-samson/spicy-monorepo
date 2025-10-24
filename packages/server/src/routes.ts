import { router, publicProcedure } from "./trpc";
import { z } from "zod";
import { db } from "./firebase";
import type { Product } from "../../shared/types";
// Return: Product[]

const products: Product[] = [];
export const appRouter = router({
  hello: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello, hope you are having a good day, ${input.name}!`,
      };
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
