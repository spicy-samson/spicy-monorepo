<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { trpc } from "../trpc";
import type { Product } from "../../../shared/types";
const products = ref<Product[]>([]);

const selectedCategory = ref("");
const categories = ref<string[]>([]);

const isSeeding = ref(false);

async function seedProducts() {
  try {
    isSeeding.value = true;
    const result = await trpc.seedProducts.mutate();
    console.log("Seeding result:", result);
    // Refresh products after seeding
    if (result.status === "Seeded") {
      await fetchProducts();
    }
  } catch (error) {
    console.error("Failed to seed products:", error);
  } finally {
    isSeeding.value = false;
  }
}

async function fetchProducts() {
  const res = await trpc.getProducts.query();
  products.value = res;
  // Extract unique categories from products
  categories.value = [...new Set(res.map((product) => product.category))];
}

// Computed products filtered by category
const filteredProducts = computed(() => {
  if (!selectedCategory.value) return products.value;
  return products.value.filter(
    (product) => product.category === selectedCategory.value
  );
});

onMounted(async () => {
  fetchProducts();
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h2 class="text-2xl font-bold text-white">Our Products</h2>
      <button
        @click="seedProducts"
        :disabled="isSeeding"
        class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <span v-if="isSeeding">Seeding...</span>
        <span v-else>Seed Data</span>
      </button>

      <!-- Category Dropdown -->
      <div class="relative">
        <select
          v-model="selectedCategory"
          class="bg-white text-gray-800 pl-4 pr-8 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white rounded-lg shadow-lg overflow-hidden"
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
            <span class="text-sm text-gray-500">{{ product.category }}</span>
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

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
