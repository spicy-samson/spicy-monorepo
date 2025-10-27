<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { trpc } from "../trpc";

const privateData = ref<string | null>(null);
const error = ref<string | null>(null);

const privateRoute = async () => {
  try {
    privateData.value = await trpc.privateData.query();
  } catch (e: any) {
    error.value = e.message || "Failed to fetch private data.";
  }
};

onMounted(() => {
  privateRoute();
});
</script>

<template>
  <div class="max-w-2xl mx-auto mt-10 p-8 bg-white rounded shadow">
    <h1 class="text-3xl font-bold text-blue-700 mb-4">About SpicyStore</h1>
    <p class="text-gray-700 mb-4">
      SpicyStore is your one-stop shop for the freshest and most exciting
      products online. We are passionate about delivering quality and value to
      our customers, with a focus on innovation and customer satisfaction.
    </p>
    <p class="text-gray-700 mb-4">
      Our team is dedicated to providing a seamless shopping experience, from
      browsing to checkout. We believe in transparency, trust, and building a
      community of happy shoppers.
    </p>
    <ul class="list-disc list-inside text-gray-600 mb-4">
      <li>Wide selection of products</li>
      <li>Secure and fast checkout</li>
      <li>Friendly customer support</li>
      <li>Regular deals and promotions</li>
    </ul>
    <p class="text-gray-700">
      Thank you for choosing SpicyStore. We hope you enjoy your shopping
      experience!
    </p>

    <div v-if="privateData" class="mt-6 p-4 bg-blue-50 rounded text-blue-800">
      <strong>Private Data:</strong> {{ privateData }}
    </div>
    <div v-if="error" class="mt-6 p-4 bg-red-50 rounded text-red-800">
      <strong>Error:</strong> {{ error }}
    </div>
  </div>
</template>
