<script setup lang="ts">
import { ref, onMounted } from "vue";
import { trpc } from "./trpc";

interface Product {
  id: number;
  name: string;
  price: number;
}

const message = ref("");

onMounted(async () => {
  const res = await trpc.hello.query({ name: "Paulino" });
  message.value = res.greeting;
});
</script>

<template>
    <!-- <div
      class="h-screen flex items-center justify-center bg-blue-600 text-white text-3xl font-bold"
    >
      🚀 Tailwind v3 working in Vue!
    </div> -->
  <main class="p-10">
    <h1 class="text-3xl font-bold">{{ message }}</h1>
  </main>
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
