<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { registerUser } from './userService';
import Notification from '../components/Notification.vue';

const router = useRouter();
const username = ref('');
const email = ref('');
const password = ref('');
const notificationMessage = ref('');
const notificationType = ref('');
const showNotification = ref(false);

const register = () => {
  if (!username.value || !email.value || !password.value) {
    notificationMessage.value = 'Please fill in all the fields.';
    notificationType.value = 'error';
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 1500);
    return; 
  }

  try {
    const newUser = {
      username: username.value,
      email: email.value,
      password: password.value,
    };
    registerUser(newUser);
    notificationMessage.value = 'Registration successful!';
    notificationType.value = 'success';
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
    setTimeout(() => {
      router.push('/profile');
    }, 2000);
  } catch (error) {
    notificationMessage.value = error.message;
    notificationType.value = 'error';
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000);
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-gray-900 relative">
    <!-- Background Decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-purple-800 to-pink-600 opacity-30 rounded-full w-96 h-96 -top-10 -left-16"></div>

    <!-- Notification -->
    <Notification v-if="showNotification" :message="notificationMessage" :type="notificationType" />

    <!-- Register Form -->
    <div class="relative z-10 w-full max-w-md bg-white text-gray-700 shadow-lg rounded-xl overflow-hidden">
      <div class="px-8 py-10 space-y-6">
        <h1 class="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Register
        </h1>

        <!-- Username -->
        <div>
          <label class="block text-sm font-medium mb-2" for="username">Username</label>
          <input v-model="username" maxlength="50"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            id="username" type="text" placeholder="Enter your username" required />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-2" for="email">Email</label>
          <input v-model="email" maxlength="50"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            id="email" type="email" placeholder="Enter your email" required />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium mb-2" for="password">Password</label>
          <input v-model="password" maxlength="14"
            class="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            id="password" type="password" placeholder="Enter your password" required />
        </div>

        <!-- Register Button -->
        <button @click="register"
          class="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-700 hover:from-purple-600 hover:to-pink-600 text-white font-bold rounded-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Register
        </button>

        <!-- Go to Login -->
        <div class="mt-4 text-center">
          <p>Already have an account?</p>
          <button @click="goToLogin" class="inline-flex items-center justify-center py-2 px-4 text-blue-400 hover:text-purple-500 font-bold transform hover:scale-105">
            Login
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
