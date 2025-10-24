<script setup lang="ts">
import { ref, onMounted } from "vue";
import { trpc } from "../trpc";
import type { Product } from "../../../shared/types";
const products = ref<Product[]>([]);

const message = ref("");
const message_farewell = ref("");

async function fetchGreeting() {
  const res = await trpc.hello.query({ name: "Third" });
  message.value = res.greeting;
}

async function sayGoodbye() {
  const res = await trpc.goodbye.query("tres");
  message_farewell.value = res.farewell;
}

async function seedProducts() {
  const res = await trpc.seedProducts.mutate();
  console.log(res);
  return res;
}

async function getProducts() {
  const res = await trpc.getProducts.query();
  products.value = res;
}

onMounted(async () => {
  // await fetchFirestore()  {
  //   "input": { /* your input data here */ }
  // };
  await fetchGreeting();
  await sayGoodbye();
  await getProducts();
});
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden m-6"
      >
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-48 object-contain bg-white p-4"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-800 truncate">
            {{ product.title }}
          </h3>
          <p class="text-gray-600 mt-2 text-sm line-clamp-2">
            {{ product.description }}
          </p>
          <div class="mt-4 flex items-center justify-between">
            <span class="text-blue-600 font-bold">${{ product.price }}</span>
            <div class="flex space-x-2">
              <button
                class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Update
              </button>
              <button
                class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          <div class="mt-2 flex items-center text-sm text-gray-500">
            <span
              >Rating: {{ product.rating.rate }} ({{
                product.rating.count
              }})</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
