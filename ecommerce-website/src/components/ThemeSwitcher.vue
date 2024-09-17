<template>
    <div class="relative inline-block text-left">
      <button
        @click="toggleDropdown"
        class="text-black dark:text-white flex items-center"
        type="button"
      >
        Theme
        <span class="material-icons">keyboard_arrow_down</span>
      </button>
      <div
        v-if="dropdownOpen"
        class="origin-top-right z-40 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"
      >
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a
            href="#"
            @click.prevent="changeTheme('light')"
            :class="{'bg-blue-500 text-white': currentTheme === 'light', 'text-gray-700 dark:text-gray-300': currentTheme !== 'light'}"
            class="block px-4 py-2 text-sm"
            role="menuitem"
          >
            Light Mode
          </a>
          <a
            href="#"
            @click.prevent="changeTheme('dark')"
            :class="{'bg-blue-500 text-white': currentTheme === 'dark', 'text-gray-700 dark:text-gray-300': currentTheme !== 'dark'}"
            class="block px-4 py-2 text-sm"
            role="menuitem"
          >
            Dark Mode
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const dropdownOpen = ref(false);
  const currentTheme = ref('light');
  
  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
  };
  
  const changeTheme = (theme: string) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      currentTheme.value = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      currentTheme.value = 'light';
    }
    dropdownOpen.value = false;
  };
  
  onMounted(() => {
    currentTheme.value = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>