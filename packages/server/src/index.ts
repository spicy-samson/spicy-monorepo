import Fastify from "fastify";
import cors from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { appRouter } from "./trpc/routes";
import { createContext } from "./trpc/context";
// import { createContext } from "./context"; // adjust as needed

const server = Fastify({
  logger: true,
});

const start = async () => {
  await server.register(cors, {
    origin: "*",
  });

  await server.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: {
      router: appRouter,
      createContext, // ✅ add this
    },
  });
  try {
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
