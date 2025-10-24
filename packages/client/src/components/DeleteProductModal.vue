<script setup lang="ts">
import type { Product } from '../../../shared/types';
import { trpc } from '../trpc';

// Props - receiving data from parent
const props = defineProps<{
  product: Product;
  isOpen: boolean;
}>();

// Emits - sending events back to parent
const emit = defineEmits<{
  'close': [];
  'delete-complete': [];
}>();

// Delete function
async function deleteProduct() {
  try {
    await trpc.deleteProduct.mutate({ id: props.product.id });
    emit('delete-complete'); // Tell parent deletion was successful
    emit('close'); // Tell parent to close modal
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg p-6 w-full max-w-md mx-4">
      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Delete Product</h3>
        
        <p class="text-gray-600 mb-6">
          Are you sure you want to delete <span class="font-semibold">{{ product.title }}</span>?
          This action cannot be undone.
        </p>

        <div class="flex justify-center space-x-4">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            @click="deleteProduct"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>