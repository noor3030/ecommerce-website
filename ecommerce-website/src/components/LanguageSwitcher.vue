<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      class="text-black dark:text-white flex items-center"
      type="button"
    >
      {{ currentLanguage }}
      <span class="material-icons">keyboard_arrow_down</span>
    </button>
    <div
      v-if="dropdownOpen"
      class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5"
    >
      <div
        class="py-1 rounded-xl"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <a
          href="#"
          @click.prevent="changeLanguage('en')"
          :class="{
            'bg-primaryLight dark:bg-primaryDark text-white dark:text-black': locale === 'en',
            'text-gray-700 dark:text-gray-300': locale !== 'en',
          }"
          class="block px-4 py-2 text-sm rounded-xl"
          role="menuitem"
        >
        English
        </a>
        <a
          href="#"
          @click.prevent="changeLanguage('ar')"
          :class="{
           'bg-primaryLight dark:bg-primaryDark text-white dark:text-black': locale === 'ar',
            'text-gray-700 dark:text-gray-300': locale !== 'ar',
          }"
          class="block px-4 py-2 text-sm rounded-xl"
          role="menuitem"
        >
        العربية 
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n();
const dropdownOpen = ref(false);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const changeLanguage = (lang: string) => {
  locale.value = lang;
  localStorage.setItem('language', lang);
  dropdownOpen.value = false;
};

const currentLanguage = computed(() => {
  return locale.value === "en" ? "English" : "العربية";
});

onMounted(() => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    locale.value = savedLanguage;
  }
});
</script>

<style scoped>
/* Add any additional styles if needed */
</style>