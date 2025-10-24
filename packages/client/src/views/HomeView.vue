<script setup lang="ts">
import { ref } from "vue";
const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <h1 class="text-3xl font-bold text-white mb-8">Welcome to Store</h1>
    <!-- Add your home page content here -->
  </div>
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