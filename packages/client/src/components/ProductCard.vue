<script lang="ts" setup>
import { defineProps, defineEmits } from "vue";
import type { Product } from "../../../shared/types";

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: "update", product: Product): void;
  (e: "delete", product: Product): void;
}>();
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg overflow-hidden">
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
            @click="emit('update', product)"
            class="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Update
          </button>
          <button
            @click="emit('delete', product)"
            class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <span
          >Rating: {{ product.rating.rate }} ({{ product.rating.count }})</span
        >
      </div>
    </div>
  </div>
</template>
