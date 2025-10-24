// packages/server/src/firebase.ts
import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import path from "path";
import "dotenv/config";

// Path relative to this file
const serviceAccountPath = path.resolve(
  __dirname,
  "firebase-service-account.json"
);
// Step 2: Initialize Firebase Admin SDK
export const firebaseApp = initializeApp({
  credential: cert(serviceAccountPath),
});

// Step 3: Get Firestore instance directly
export const db = getFirestore(firebaseApp);

console.log("✅ Firebase Admin SDK initialized successfully!");
