<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleDropdown"
      class="text-[#000] dark:text-[#fff] flex items-center px-4 py-2"
      type="button"
    >
      <span v-if="currentTheme === 'light'"> {{ $t("light") }}</span>
      <span v-else> {{ $t("dark") }}</span>
      <v-icon icon="mdi-chevron-down"></v-icon>
    </button>
    <div
      v-if="dropdownOpen"
      class="origin-top-right z-40 absolute right-0 w-56 rounded-3xl shadow-lg bg-[#fff] dark:bg-gray-700 ring-1 ring-black ring-opacity-5 xl:mt-4 xl:w-20 xl:right-0 xl:left-0 xl:text-center"
    >
      <div
        class="rounded-xl"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <a
          href="#"
          @click.prevent="changeTheme('light')"
          :class="{
            'bg-primaryLight text-white': currentTheme === 'light',
            'text-gray-700 dark:text-gray-300': currentTheme !== 'light',
          }"
          class="block px-4 py-2 text-sm rounded-xl"
          role="menuitem"
        >
          {{ $t("light") }}
        </a>
        <a
          href="#"
          @click.prevent="changeTheme('dark')"
          :class="{
            'bg-primaryDark text-black': currentTheme === 'dark',
            'text-gray-700 dark:text-gray-300': currentTheme !== 'dark',
          }"
          class="block px-4 py-2 text-sm rounded-xl"
          role="menuitem"
        >
          {{ $t("dark") }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const dropdownOpen = ref(false);
const currentTheme = ref("light");

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const changeTheme = (theme: string) => {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    currentTheme.value = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    currentTheme.value = "light";
  }
  localStorage.setItem("theme", currentTheme.value);
  dropdownOpen.value = false;
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    currentTheme.value = savedTheme;
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } else {
    currentTheme.value = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
  }
});
</script>
