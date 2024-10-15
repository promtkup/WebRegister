<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref({});
const getUser = () => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  } else {
    router.push('/login');
  }
};

getUser();
</script>

<template>
  <div class="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
    <div class="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
      <h1 class="text-3xl font-bold text-blue-800 mb-6 text-center">Profile</h1>

      <!-- Username Section -->
      <div class="mb-6">
        <label class="block text-lg font-medium text-gray-700">Username:</label>
        <p class="mt-2 text-xl text-gray-900">{{ user.username }}</p>
      </div>

      <!-- Email Section -->
      <div class="mb-6">
        <label class="block text-lg font-medium text-gray-700">Email:</label>
        <p class="mt-2 text-xl text-gray-900">{{ user.email }}</p>
      </div>

      <!-- Logout Button -->
      <button @click="router.push('/login')"
        class="w-full py-2 px-4 bg-blue-700 hover:bg-blue-800 text-white text-lg font-semibold rounded-lg transition ease-in-out duration-200">
        Back
      </button>
    </div>
  </div>
</template>
