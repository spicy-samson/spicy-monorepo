<script setup lang="ts">
import { ref } from "vue";

interface Product {
  id: number;
  name: string;
  price: number;
}

const products = ref<Product[]>([
  { id: 1, name: "Apple", price: 1.99 },
  { id: 2, name: "Banana", price: 0.99 },
  { id: 3, name: "Orange", price: 1.49 },
]);

function buy(product: Product) {
  alert(`You bought: ${product.name} for $${product.price}`);
}
</script>

<template>
  <div>
    <div
      class="h-screen flex items-center justify-center bg-blue-600 text-white text-3xl font-bold"
    >
      🚀 Tailwind v3 working in Vue!
    </div>
    <h1 class="text-blue-500">Shop</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - ${{ product.price }}
        <button @click="buy(product)">Buy</button>
      </li>
    </ul>
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
