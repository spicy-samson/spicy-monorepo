// packages/server/src/firebase.ts
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { getAuth } from "firebase-admin/auth";
import path from "path";
import "dotenv/config";

// Detect environment
const isDev = process.env.NODE_ENV !== "production";

// 🧠 Emulator mode (for local dev)
if (isDev) {
  // Use admin SDK's built-in emulator support
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8085";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = "127.0.0.1:9199";

  console.log("🔥 Connected to Firebase Emulators (server mode)");
} else {
  console.log("🚀 Connected to Firebase Production (dashboard)");
}

// Path relative to this file
const serviceAccountPath = path.resolve(
  __dirname,
  "firebase-service-account.json"
);

// Step 2: Initialize Firebase Admin SDK
export const firebaseApp = initializeApp({
  credential: cert(serviceAccountPath),
  storageBucket: "spicy-monorepo.firebasestorage.app",
});

// Step 3: Get Firestore instance directly
export const db = getFirestore(firebaseApp);
export const adminAuth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
