<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { trpc } from "../trpc";
import type { Product } from "../../../shared/types";
import ProductCard from "../components/ProductCard.vue";
import UpdateProductModal from "../components/UpdateProductModal.vue";
import DeleteProductModal from "../components/DeleteProductModal.vue";
const isUpdateModalOpen = ref(false);
const selectedProduct = ref<Product | null>(null);
const products = ref<Product[]>([]);
// Add these with your other refs
const isDeleteModalOpen = ref(false);
const productToDelete = ref<Product | null>(null);

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

function openUpdateModal(product: Product) {
  selectedProduct.value = product;
  isUpdateModalOpen.value = true;
}

function closeUpdateModal() {
  isUpdateModalOpen.value = false;
  selectedProduct.value = null; // Reset selected product when closing
}

// Add this function
function openDeleteModal(product: Product) {
  productToDelete.value = product;
  isDeleteModalOpen.value = true;
}

function closeDeleteModal() {
  isDeleteModalOpen.value = false;
  productToDelete.value = null;
}
PageRevealEvent;

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
      <ProductCard
      v-for="product in filteredProducts"
      :key="product.id"
      :product="product"
      @update="openUpdateModal"
      @delete="openDeleteModal"
      />
      
    </div>
  </div>
  <UpdateProductModal
    v-if="selectedProduct"
    :product="selectedProduct"
    :is-open="isUpdateModalOpen"
    @close="closeUpdateModal"
    @update-complete="fetchProducts"
  />
  <DeleteProductModal
    v-if="productToDelete"
    :product="productToDelete"
    :is-open="isDeleteModalOpen"
    @close="closeDeleteModal"
    @delete-complete="fetchProducts"
  />
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
