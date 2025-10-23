<script setup lang="ts">
import { ref, onMounted } from "vue";
import { trpc } from "./trpc";
import { db } from "./lib/firebase";
import { collection, getDocs } from "firebase/firestore";

const message = ref("");

async function fetchFirestore() {
  try {
    const querySnapshot = await getDocs(collection(db, "testCollection"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`, doc.data());
    });
    console.log("✅ Successfully connected to Firestore");
    console.log(querySnapshot);
  } catch (error) {
    console.error("❌ Firestore connection failed:", error);
  }
}

async function fetchGreeting() {
  const res = await trpc.hello.query({ name: "Third" });
  message.value = res.greeting;
}

onMounted(async () => {
  await fetchFirestore();
  await fetchGreeting();
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-blue-600 text-white"
  >
    <div class="flex items-center space-x-4 mb-6">
      <span class="text-4xl">🚀</span>
      <span class="text-orange-400 text-3xl font-bold">{{ message }}</span>
    </div>
    <h1 class="text-3xl font-bold mb-2">Tailwind v3 working in Vue!</h1>
    <h2 class="text-xl font-semibold mb-4">Firestore Connection Test</h2>
  </div>
</template>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 0.5rem;
}
button {
  margin-left: 1rem;
}
</style>
