# Copilot Instructions for Spicy Monorepo

## Architecture Overview

- **Monorepo Structure:**  
  The project is a monorepo with separate `client` (Vue 3 + Vite) and `server` (Node.js, Fastify, tRPC, Firebase Admin) packages under `/packages`.
- **Frontend:**  
  - Located in `packages/client/`
  - Uses Vue 3 with `<script setup lang="ts">` and Tailwind CSS.
  - Authentication and Firestore access via Firebase JS SDK.
  - Views and layouts are in `src/views/` and `src/layouts/`.
  - tRPC client is configured in `src/trpc.ts` to send Firebase ID tokens with every request.
- **Backend:**  
  - Located in `packages/server/`
  - Fastify server with tRPC endpoints in `src/trpc/`.
  - Firebase Admin SDK for Auth, Firestore, and Storage.
  - Context (`src/trpc/context.ts`) extracts user info from Firebase ID tokens in the `Authorization` header.
  - Middleware (`src/trpc/middleware.ts`) enforces authentication for protected routes.

## Developer Workflows

- **Development (Emulator Mode):**
  - Start Firebase emulators: `firebase emulators:start`
  - Start server: `pnpm dev:server` (uses emulators if `NODE_ENV` is not `production`)
  - Start client: `pnpm dev:client`
- **Production:**
  - Set `NODE_ENV=production` and do NOT run emulators.
  - Ensure real Firebase credentials are available.
- **Testing Data Persistence:**
  - Use `firebase emulators:start --import=./emulator-data --export-on-exit` to persist emulator data.
- **Seeding Data:**
  - Use the `seedProducts` tRPC mutation to populate Firestore emulator with sample products.

## Project-Specific Patterns & Conventions

- **Authentication:**
  - Always send the Firebase ID token in the `Authorization: Bearer <token>` header for protected API calls.
  - Use the helper in `client/src/lib/getIdToken.ts` to retrieve the current user's ID token.
- **tRPC Integration:**
  - All tRPC procedures are defined in `server/src/trpc/routes.ts`.
  - Use `publicProcedure` for open endpoints and `isAuthed` middleware for protected ones.
- **Firestore Usage:**
  - User documents are stored in the `users` collection, keyed by UID.
  - Product documents are in the `products` collection.
- **Storage:**
  - User profile photos are uploaded to `users/{uid}/profile.jpg` in Firebase Storage.
  - The emulator does not persist or serve files; use production for real file uploads.
- **Environment Config:**
  - Client uses `.env` files with `VITE_FIREBASE_*` variables.
  - Server uses service account JSON and environment variables for Firebase Admin.

## Integration Points

- **Frontend ↔ Backend:**  
  - Communication via tRPC with automatic ID token injection (see `client/src/trpc.ts`).
- **Backend ↔ Firebase:**  
  - Admin SDK for all privileged operations; context verifies tokens for user-level security.

## Key Files & Directories

- `packages/client/src/lib/firebase.ts` — Firebase client SDK setup
- `packages/client/src/trpc.ts` — tRPC client with auth header logic
- `packages/server/src/trpc/context.ts` — tRPC context with Firebase token verification
- `packages/server/src/trpc/middleware.ts` — Auth middleware for tRPC
- `packages/server/src/firebase.ts` — Firebase Admin SDK setup
- `packages/server/firebase.json` — Emulator and rules configuration

---

**Feedback Requested:**  
If any section is unclear, incomplete, or missing important project-specific details, please let us know so we can improve these instructions for future AI agents and contributors.