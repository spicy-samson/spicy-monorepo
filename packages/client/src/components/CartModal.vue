<script setup lang="ts">
import { useCartStore } from "../stores/cart";
import TrashSvg from "../assets/TrashSvg.vue";
const cart = useCartStore();
</script>

<template>
  <transition name="fade">
    <div
      v-if="cart.isModalOpen"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <div
        class="bg-white m-8 rounded-2xl shadow-2xl w-full max-w-lg p-8 relative border-4 border-yellow-400"
        style="box-shadow: 0 8px 40px 0 rgba(0, 0, 0, 0.25)"
      >
        <button
          class="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold"
          @click="cart.closeModal()"
        >
          ✕
        </button>
        <h2
          class="text-xl font-extrabold mb-6 text-yellow-500 flex items-center gap-2"
        >
          🛒 Your Cart
        </h2>
        <div
          v-if="cart.items.length === 0"
          class="text-gray-500 text-lg text-center py-8"
        >
          Cart is empty.
        </div>
        <ul
          v-else
          class="divide-y divide-gray-200 max-h-80 overflow-y-auto mb-4"
        >
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="flex justify-between items-center py-3 group"
          >
            <div class="flex items-center gap-2 w-full">
              <span
                class="text-sm font-semibold text-gray-800 break-words whitespace-normal max-w-[200px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[250px]"
                :title="item.title"
              >
                {{ item.title }}
              </span>
              <!-- Quantity controls -->
              <div class="flex items-center mx-2">
                <button
                  class="px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-base"
                  @click="cart.decreaseQuantity(item.id)"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span
                  class="mx-2 text-base font-semibold text-gray-700 min-w-[24px] text-center"
                  >{{ item.quantity }}</span
                >
                <button
                  class="px-2 py-0.5 rounded bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold text-base"
                  @click="cart.addToCart(item)"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              <button
                class="ml-2 text-red-600 hover:bg-red-100 rounded p-1 font-bold transition opacity-0 group-hover:opacity-100"
                @click="cart.removeFromCart(item.id)"
                tabindex="-1"
              >
                <TrashSvg class="w-5 h-5" />
              </button>
            </div>
            <div class="text-sm text-gray-500 ml-4 min-w-[60px] text-right">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </li>
        </ul>
        <div
          v-if="cart.items.length > 0"
          class="flex justify-between items-center mt-6 mb-2 px-1"
        >
          <span class="text-lg font-semibold text-gray-700">Total:</span>
          <span class="text-lg font-bold text-yellow-500">
            ${{ cart.total.toFixed(2) }}
          </span>
        </div>
        <div v-if="cart.items.length > 0" class="flex justify-end">
          <button
            class="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow transition text-lg"
            @click="cart.closeModal()"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Truncate product name and show trash only on hover */
.group:hover .group-hover\:opacity-100 {
  opacity: 1 !important;
}
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
