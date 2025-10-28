<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { trpc } from "../trpc";
import type { Product } from "../../../shared/types";
import ProductCard from "../components/ProductCard.vue";
import { useCartStore } from "../stores/cart";

const products = ref<Product[]>([]);
const selectedCategory = ref("");
const categories = ref<string[]>([]);
const cart = useCartStore();
const cartMessage = ref("");

function addToCart(product: Product) {
  cart.addToCart(product);
  cartMessage.value = `${product.title} added to cart!`;
  setTimeout(() => (cartMessage.value = ""), 2000);
}

async function fetchProducts() {
  const res = await trpc.getProducts.query();
  products.value = res;
  categories.value = [...new Set(res.map((p) => p.category))];
}

const filteredProducts = computed(() =>
  !selectedCategory.value
    ? products.value
    : products.value.filter((p) => p.category === selectedCategory.value)
);

onMounted(fetchProducts);
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-14"
  >
    <div class="container mx-auto px-6">
      <!-- Header Section -->
      <div
        class="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-6"
      >
        <h2
          class="text-4xl font-extrabold text-yellow-700 tracking-tight drop-shadow-sm"
        >
          🛍️ Shop Our Collection
        </h2>

        <!-- Category Dropdown -->
        <div class="relative">
          <select
            v-model="selectedCategory"
            class="bg-white text-yellow-700 font-medium pl-4 pr-10 py-2 rounded-xl shadow-md hover:shadow-lg border border-yellow-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 transition-all"
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

      <!-- Cart Message -->
      <transition name="fade">
        <div
          v-if="cartMessage"
          class="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
          style="width: 90vw; max-width: 420px"
        >
          <div
            class="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg text-center font-semibold text-lg animate-bounce"
          >
            {{ cartMessage }}
          </div>
        </div>
      </transition>

      <!-- Product Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10"
      >
        <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          class="hover:scale-[1.03] transition-transform duration-300"
        >
          <template #actions>
            <div class="flex justify-end mt-5">
              <button
                class="bg-yellow-400 hover:bg-yellow-500 text-white w-12 h-12 rounded-full shadow-lg border-4 border-white flex items-center justify-center text-2xl transition-all duration-200 ease-in-out hover:rotate-6 active:scale-90 focus:ring-4 focus:ring-yellow-300"
                @click="addToCart(product)"
                :aria-label="`Add ${product.title} to cart`"
              >
                🛒
              </button>
            </div>
          </template>
        </ProductCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Subtle entrance animation for grid items */
.ProductCard-enter-active {
  transition: all 0.3s ease;
  transform: translateY(10px);
  opacity: 0;
}
.ProductCard-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>
