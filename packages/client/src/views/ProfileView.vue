<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const router = useRouter();
const user = ref<any>(null);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    router.push("/login");
    return;
  }
  try {
    const userDoc = await getDoc(doc(db, "users", currentUser.uid));
    if (userDoc.exists()) {
      user.value = userDoc.data();
    } else {
      error.value = "User not found.";
    }
  } catch (e: any) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <h2 class="text-2xl font-bold mb-4 text-blue-600">Profile</h2>
    <div v-if="loading" class="text-blue-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else-if="user">
      <div class="flex items-center space-x-4 mb-4">
        <img
          v-if="user.photoURL"
          :src="user.photoURL"
          alt="Profile Photo"
          class="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <div class="font-semibold text-lg text-blue-800">{{ user.fullName }}</div>
          <div class="text-gray-500">{{ user.email }}</div>
        </div>
      </div>
      <div class="text-xs text-gray-400">
        Joined: {{ user.createdAt?.toDate ? user.createdAt.toDate().toLocaleString() : user.createdAt }}
      </div>
    </div>
  </div>
</template>
