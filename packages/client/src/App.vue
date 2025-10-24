<script setup lang="ts">
import { ref } from "vue";
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-blue-600">
    <!-- Navigation Bar -->
    <nav class="bg-white shadow-lg w-full">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Brand -->
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-blue-600">SpicyStore</h1>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8">
            <router-link
              to="/"
              class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
              >Home</router-link
            >
            <router-link
              to="/shop"
              class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
              >Shop</router-link
            >

            <router-link
              to="/about"
              class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
              >About</router-link
            >
            <router-link
              to="/contact"
              class="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md font-medium"
              >Contact</router-link
            >
          </div>

          <!-- Shopping Cart & User -->
          <div class="hidden md:flex items-center space-x-4">
            <button class="text-gray-600 hover:text-blue-600">
              <span class="sr-only">Shopping Cart</span>
              🛒
            </button>
            <button class="text-gray-600 hover:text-blue-600">
              <span class="sr-only">User Account</span>
              👤
            </button>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button
              @click="toggleMenu"
              class="text-gray-600 hover:text-blue-600"
            >
              <span class="sr-only">Menu</span>
              ☰
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-show="isMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link
            to="/"
            class="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
            >Home</router-link
          >
          <router-link
            to="/shop"
            class="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
            >Shop</router-link
          >

          <router-link
            to="/about"
            class="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
            >About</router-link
          >
          <router-link
            to="/contact"
            class="block text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md"
            >Contact</router-link
          >
          <div class="flex space-x-4 px-3 py-2">
            <button class="text-gray-600 hover:text-blue-600">🛒</button>
            <button class="text-gray-600 hover:text-blue-600">👤</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content Area -->
    <main class="flex-grow">
      <router-view />
    </main>
  </div>
</template>