<!-- src/components/UpdateProductModal.vue -->
<script setup lang="ts">
import { ref, watch } from 'vue';
import type { Product } from '../../../shared/types';
import { trpc } from '../trpc';

const props = defineProps<{
  product: Product;
  isOpen: boolean;
}>();

const emit = defineEmits<{
  'close': [];
  'update-complete': [];
}>();

const updateForm = ref({
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
});

// Watch for changes in the product prop and isOpen to reset the form
watch(
  () => ({ product: props.product, isOpen: props.isOpen }),
  ({ product, isOpen }) => {
    if (isOpen) {
      // Reset form with new product data when modal opens
      updateForm.value = {
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      };
    }
  },
  { immediate: true }
);

async function updateProduct() {
  try {
    await trpc.updateProduct.mutate({
      id: props.product.id,
      ...updateForm.value
    });
    emit('update-complete');
    emit('close');
  } catch (error) {
    console.error("Failed to update product:", error);
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white m-12 rounded-lg p-6 w-full max-w-xl mx-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-gray-900">Update Product</h3>
        <button
          @click="$emit('close')"
          class="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <form @submit.prevent="updateProduct" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Title</label>
          <input
            v-model="updateForm.title"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Price</label>
          <input
            v-model="updateForm.price"
            type="number"
            step="0.01"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            v-model="updateForm.description"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Category</label>
          <input
            v-model="updateForm.category"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            v-model="updateForm.image"
            type="url"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>