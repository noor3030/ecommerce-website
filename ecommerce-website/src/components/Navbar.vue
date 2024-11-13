<script setup lang="ts">
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import Logo from "./Logo.vue";
import { useI18n } from "vue-i18n";

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 0) {
      navbar.classList.add("fixed", "top-0", "left-0", "z-50", "w-full");
    } else {
      navbar.classList.remove("fixed", "top-0", "left-0", "z-50");
    }
  }
});
const { t } = useI18n();

const pages = [
  { name: t("Home"), path: "/" },
  { name: t("Categories"), path: "/categories" },
  { name: t("Cart"), path: "/cart" },
  { name: t("Account"), path: "/account" },
  { name: t("Delivery"), path: "/checkout" },
];
</script>

<template>
  <div>
    <div class="flex flex-col space-y-4 bg-[#fff] dark:bg-[#000]" id="navbar">
      <nav
        class="bg-primaryLight px-6 py-2 text-center dark:bg-primaryDark dark:text-black flex justify-between items-center text-[#ffffff]"
      >
        <h4>{{ $t("Get 50% off on selected items") }}</h4>

        <h4>|</h4>
        <button>{{ $t("shopNow") }}</button>
      </nav>
      <div class="flex px-6 items-center justify-between">
        <Logo />
        <button
          class=""
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
        >
          <v-icon icon="mdi-menu" class="text-2xl dark:text-white"></v-icon>
        </button>
      </div>
    </div>
    <div
      id="drawer-navigation"
      class="fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-[#ffff] w-64 dark:bg-gray-800 flex flex-col space-y-4"
      aria-labelledby="drawer-navigation-label"
    >
      <button
        type="button"
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        class="self-end"
      >
        <v-icon icon="mdi-close" class="text-2xl dark:text-[#ffff]"></v-icon>
      </button>

      <form class="max-w-md mx-auto">
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <v-icon icon="mdi-magnify" class="mt-1"></v-icon>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-onSecondaryLight dark:text-onSecondaryDark rounded-xl bg-secondaryLight dark:bg-secondaryDark border-none"
            :placeholder="$t('search')"
            required
          />
        </div>
      </form>

      <ul class="flex flex-col space-y-4 text-[#000] dark:text-[#ffff]">
        <li v-for="page in pages">
          <router-link :to="page.path">{{ page.name }}</router-link>
        </li>
      </ul>

      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  </div>
</template>
