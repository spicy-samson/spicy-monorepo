<script setup lang="ts">
import { ref, onMounted } from 'vue';
// Example stats, replace with real data fetching as needed
const stats = ref([
  { label: 'Total Users', value: 4200, icon: 'user-group', color: 'primary' },
  { label: 'Total Products', value: 25000, icon: 'cube', color: 'secondary' },
  { label: 'Orders', value: 1200, icon: 'shopping-cart', color: 'accent' },
  { label: 'Revenue', value: '$98,000', icon: 'currency-dollar', color: 'success' },
]);

const recentActivities = ref([
  { user: 'Jane Doe', action: 'added a new product', time: '2m ago' },
  { user: 'John Smith', action: 'updated an order', time: '10m ago' },
  { user: 'Admin', action: 'deleted a user', time: '1h ago' },
]);
</script>

<template>
  <div class="min-h-screen bg-base-200 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg h-screen flex flex-col py-8 px-4 sticky top-0">
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-primary mb-2">Admin</h2>
        <div class="text-xs text-gray-400">Dashboard</div>
      </div>
      <nav class="flex-1">
        <ul class="space-y-2">
          <li>
            <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 text-gray-700 font-medium">
              <span class="mr-3">🏠</span> Overview
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 text-gray-700 font-medium">
              <span class="mr-3">🧊</span> Products
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 text-gray-700 font-medium">
              <span class="mr-3">👥</span> Users
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 text-gray-700 font-medium">
              <span class="mr-3">🛒</span> Orders
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center px-3 py-2 rounded-lg hover:bg-base-200 text-gray-700 font-medium">
              <span class="mr-3">💰</span> Revenue
            </a>
          </li>
        </ul>
      </nav>
      <div class="mt-10">
        <button class="w-full py-2 bg-red-100 text-red-600 rounded-lg font-semibold hover:bg-red-200 transition">Logout</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <h1 class="text-3xl font-bold mb-8 text-primary">Admin Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div v-for="stat in stats" :key="stat.label" :class="`stat bg-white shadow rounded-lg p-6 border-t-4 border-${stat.color}`">
          <div class="stat-figure text-2xl mb-2">
            <span v-if="stat.icon === 'user-group'">👥</span>
            <span v-else-if="stat.icon === 'cube'">🧊</span>
            <span v-else-if="stat.icon === 'shopping-cart'">🛒</span>
            <span v-else-if="stat.icon === 'currency-dollar'">💰</span>
          </div>
          <div class="stat-title text-gray-500">{{ stat.label }}</div>
          <div class="stat-value text-2xl font-bold text-gray-800">{{ stat.value }}</div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-semibold mb-4 text-secondary">Recent Activities</h2>
        <ul>
          <li v-for="activity in recentActivities" :key="activity.time" class="flex items-center justify-between py-2 border-b last:border-b-0">
            <span><span class="font-semibold text-primary">{{ activity.user }}</span> {{ activity.action }}</span>
            <span class="text-xs text-gray-400">{{ activity.time }}</span>
          </li>
        </ul>
      </div>
    </main>
  </div>
</template>

<style scoped>
.stat {
  transition: box-shadow 0.2s;
}
.stat:hover {
  box-shadow: 0 8px 24px 0 rgba(0,0,0,0.08);
}
aside {
  min-width: 16rem;
}
</style>
