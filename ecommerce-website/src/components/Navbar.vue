<script setup lang="ts">
import { ref } from "vue";
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import Logo from "./Logo.vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import "animate.css";

const isDrawerOpen = ref(false);
const drawerAnimation = ref("");

const toggleDrawer = (state: boolean) => {
  if (state) {
    drawerAnimation.value = "animate__animated animate__slideInLeft";
    isDrawerOpen.value = true;
  } else {
    drawerAnimation.value = "animate__animated animate__slideOutLeft";
    setTimeout(() => {
      isDrawerOpen.value = false;
    }, 500);
  }
};

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
const route = useRoute();
const router = useRouter();

const pages = [
  { name: "Home", path: "/" },
  { name: "Categories", path: "/categories" },
  { name: "Cart", path: "/cart" },
  { name: "Account", path: "/account" },
  { name: "Delivery", path: "/checkout" },
];

const navigateToPage = (path: string) => {
  router.push(path); // Navigate to the selected page
  toggleDrawer(false); // Close the drawer
};
</script>

<template>
  <div>
    <div class="flex flex-col space-y-4 bg-[#fff] dark:bg-[#000]" id="navbar">
      <nav
        class="bg-primaryLight px-6 py-2 text-center dark:bg-primaryDark dark:text-black flex justify-between items-center text-[#ffffff]"
      >
        <div class="hidden xl:flex space-x-2 rtl:space-x-reverse">
          <v-icon icon="mdi-phone-outline"></v-icon>
          <p>07700000000</p>
        </div>
        <div class="hidden xl:flex space-x-4 rtl:space-x-reverse">
          <h4>{{ $t("Get 50% off on selected items") }}</h4>
          <h4>|</h4>
          <button>{{ $t("shopNow") }}</button>
        </div>
        <div class="hidden xl:block">
          <ThemeSwitcher /> <LanguageSwitcher />
        </div>

        <h4 class="block xl:hidden">
          {{ $t("Get 50% off on selected items") }}
        </h4>
        <h4 class="block xl:hidden">|</h4>
        <button class="block xl:hidden">{{ $t("shopNow") }}</button>
      </nav>
      <div class="flex px-6 items-center justify-between">
        <Logo />
        <button
          class="xl:hidden"
          @click="toggleDrawer(true)"
          type="button"
          aria-controls="drawer-navigation"
        >
          <v-icon icon="mdi-menu" class="text-2xl dark:text-white"></v-icon>
        </button>
        <div class="xl:flex hidden space-x-6 rtl:space-x-reverse">
          <router-link
            v-for="page in pages"
            :to="page.path"
            class="hover:text-primaryLight dark:hover:text-primaryDark hover:font-bold hover:underline text-lg"
            active-class="text-primaryLight font-bold underline dark:text-primaryDark"
          >
            {{ page.name }}
          </router-link>
        </div>
        <div class="hidden xl:block">
          <input
            type="search"
            id="default-search"
            class=" w-full p-4 ps-10 text-sm text-onSecondaryLight dark:text-onSecondaryDark rounded-xl bg-secondaryLight dark:bg-secondaryDark border-none"
            :placeholder="$t('search')"
            required
          />
        </div>
      </div>
    </div>
    <div
      v-if="isDrawerOpen"
      id="drawer-navigation"
      :class="[
        'fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto bg-[#ffff] w-64 dark:bg-gray-800 flex flex-col space-y-4',
        drawerAnimation,
      ]"
    >
      <button
        type="button"
        @click="toggleDrawer(false)"
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
      <div class="flex flex-col">
        <ul class="text-[#000] dark:text-[#ffff]">
          <li
            v-for="page in pages"
            :key="page.path"
            :class="{
              'bg-[#00462D] dark:bg-[#B9FFE6] text-[#fff] dark:text-[#000]':
                route.path === page.path,
              'hover:bg-gray-200 dark:hover:bg-gray-600':
                route.path !== page.path,
            }"
            class="rounded-3xl"
          >
            <button
              @click="navigateToPage(page.path)"
              class="block px-4 py-2 rounded-lg w-full text-start"
            >
              {{ $t(page.name) }}
            </button>
          </li>
        </ul>
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  </div>
</template>
