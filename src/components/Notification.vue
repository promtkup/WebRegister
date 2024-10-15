<script setup>
import { ref, onMounted } from 'vue';  
const props = defineProps({
  message: String,
  type: {
    type: String,
    default: 'success',
  },
  duration: {
    type: Number,
    default: 3000,
  }
});
const isVisible = ref(true);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false;
  }, props.duration);
});
</script>

<template>
    <div
      v-if="isVisible"
      class="fixed bottom-5 right-5 bg-opacity-90 shadow-lg p-4 rounded-lg flex items-center justify-between"
      :class="type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'"
      style="z-index: 9999;" 
    >
      <p>{{ message }}</p>
    </div>
  </template>
  

  