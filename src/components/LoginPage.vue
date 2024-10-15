<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Notification from '../components/Notification.vue';

const router = useRouter();
const emailOrUsername = ref('');
const password = ref('');
const lastUser = ref(null);
const showLoginForm = ref(false);
const isLoadingLastUser = ref(true);
const notificationMessage = ref('');
const notificationType = ref('');
const showNotification = ref(false);
const errorMessage = ref('');

const loadLastLoggedInUser = () => {
  setTimeout(() => { 
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      lastUser.value = user;
    }
    isLoadingLastUser.value = false;
  }, 1000); 
};

onMounted(() => {
  loadLastLoggedInUser();
});

const login = () => {
  if (!emailOrUsername.value || !password.value) {
    notificationMessage.value = 'Please fill in all fields!';
    notificationType.value = 'error';
    showNotification.value = true;

    setTimeout(() => { showNotification.value = false; }, 1500);
    return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(
    (u) =>
      (u.email === emailOrUsername.value || u.username === emailOrUsername.value) &&
      u.password === password.value
  );

  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    notificationMessage.value = 'Login successful!';
    notificationType.value = 'success';
    showNotification.value = true;

    setTimeout(() => {
      router.push('/profile');
    }, 1500);
  } else {
    errorMessage.value = 'Invalid email/username or password.';
    notificationMessage.value = 'Invalid email/username or password.';
    notificationType.value = 'error';
    showNotification.value = true;

    setTimeout(() => { showNotification.value = false; }, 1500);
  }
};

const selectLastUser = () => {
  emailOrUsername.value = lastUser.value.email || lastUser.value.username;
  showLoginForm.value = true;
};

const useAnotherAccount = () => {
  emailOrUsername.value = '';
  password.value = '';
  showLoginForm.value = true;
};

const goToRegister = () => {
  router.push('/register');
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900 p-6 relative">
    <!-- Background Decoration -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-300 opacity-20 rounded-full w-96 h-96 -top-16 -left-20"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-300 opacity-20 rounded-full w-96 h-96 -bottom-16 -right-20"></div>

    <!-- Notification Component -->
    <Notification v-if="showNotification" :message="notificationMessage" :type="notificationType" />

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="px-8 py-10 space-y-8">
        <h1 class="text-3xl font-bold text-center text-blue-600 animate-pulse">
          Welcome Back!
        </h1>

        <!-- Show last logged-in user -->
        <div v-if="!isLoadingLastUser && lastUser && !showLoginForm" class="mb-6">
          <h2 class="text-center text-gray-700 mb-4">Welcome back, {{ lastUser.username }}!</h2>
          <button @click="selectLastUser" class="w-full bg-gray-100 hover:bg-blue-200 py-2 px-4 rounded-lg flex items-center justify-between transition-all duration-300 ease-in-out shadow-md">
            <span class="text-left">{{ lastUser.email || lastUser.username }}</span>
            <span class="text-sm text-blue-500">→</span>
          </button>
          <div class="text-center mt-4">
            <button @click="useAnotherAccount"
              class="inline-flex items-center justify-center py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold rounded-lg focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 ease-in-out">
              Use another account
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Placeholder for loading last user -->
        <div v-if="isLoadingLastUser" class="flex justify-center items-center mb-6">
          <p class="text-gray-500 animate-bounce">Loading your account...</p>
        </div>

        <!-- Login Form -->
        <div v-if="showLoginForm || (!lastUser && !isLoadingLastUser)">
          <!-- Email or Username -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700" for="emailOrUsername">Email or Username</label>
            <input v-model="emailOrUsername" maxlength="50"
              class="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              id="emailOrUsername" type="text" placeholder="Enter your email or username" required />
          </div>

          <!-- Password -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700" for="password">Password</label>
            <input v-model="password" maxlength="14"
              class="block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
              id="password" type="password" autocomplete="current-password" placeholder="Enter your password" required />
          </div>

          <!-- Error Message -->
          <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

          <!-- Login Button -->
          <button @click="login" :disabled="!emailOrUsername || !password"
            class="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold rounded-lg focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-300 ease-in-out">
            Login
          </button>
        </div>

        <!-- Register Link -->
        <div class="mt-6 text-center">
          <p>Don't have an account yet?</p>
          <button @click="goToRegister" class="inline-flex items-center justify-center py-2 px-4 text-blue-400 hover:text-blue-500 font-bold transition-all duration-300 ease-in-out transform hover:scale-105">
            Register
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
