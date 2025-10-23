import Fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./trpc";
// import { createContext } from "./context"; // adjust as needed

const server = Fastify({
  logger: true,
});

(async () => {
  await server.register(cors, {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  });

  server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter },
  });

  await server.listen({ port: 3000 });
  console.log("✅ Server running on http://localhost:3000");
})();
