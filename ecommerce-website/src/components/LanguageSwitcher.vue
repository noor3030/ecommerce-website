<template>
    <div class="relative inline-block text-left">
      <button
        @click="toggleDropdown"
        class="text-black dark:text-white flex items-center"
        type="button"
      >
        {{ $t('message.language') }}
        <span class="material-icons">keyboard_arrow_down</span>
      </button>
      <div
        v-if="dropdownOpen"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"
      >
        <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a
            href="#"
            @click.prevent="changeLanguage('en')"
            :class="{'bg-blue-500 text-white': locale === 'en', 'text-gray-700 dark:text-gray-300': locale !== 'en'}"
            class="block px-4 py-2 text-sm"
            role="menuitem"
          >
            {{ $t('message.english') }}
          </a>
          <a
            href="#"
            @click.prevent="changeLanguage('ar')"
            :class="{'bg-blue-500 text-white': locale === 'ar', 'text-gray-700 dark:text-gray-300': locale !== 'ar'}"
            class="block px-4 py-2 text-sm"
            role="menuitem"
          >
            {{ $t('message.arabic') }}
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  
  const { locale, t } = useI18n();
  const dropdownOpen = ref(false);
  
  const toggleDropdown = () => {
    dropdownOpen.value = !dropdownOpen.value;
  };
  
  const changeLanguage = (lang: string) => {
    locale.value = lang;
    dropdownOpen.value = false;
  };
  </script>
  
  <style scoped>
  /* Add any additional styles if needed */
  </style>