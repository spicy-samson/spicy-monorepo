import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../server/src/trpc/routes";
import { getAuth } from "firebase/auth";

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
      async headers() {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const token = currentUser ? await currentUser.getIdToken() : null;
        return token ? { authorization: `Bearer ${token}` } : {};
      },
    }),
  ],
});
