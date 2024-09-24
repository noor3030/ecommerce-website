<script setup lang="ts">
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { ref } from "vue";


window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 0) {
      navbar.classList.add("fixed", "top-0", "left-0", "z-50", 'bg-white' ,'w-full' ,'dark:bg-black');
    } else {
      navbar.classList.remove("fixed", "top-0", "left-0", "z-50", 'bg-white' );
    }
  }
});
</script>

<template>
  <div>
    <div class="flex flex-col space-y-4" id="navbar">
      <nav
        class="bg-primaryLight px-6 py-2 text-center text-white dark:bg-primaryDark dark:text-black flex justify-between items-center"
      >
        <h4>{{ $t("Get 50% off on selected items") }}</h4>

        <h4>|</h4>
        <button>{{ $t("shopNow") }}</button>
      </nav>
      <div class="flex px-6 items-center justify-between " >
        <div class="flex items-center space-x-2 rtl:space-x-reverse " >
          <img
            src="../assets/images/logo.svg"
            alt=""
            class="rtl:scale-x-[-1] block dark:hidden"

          />
          <img
            src="../assets/images/dark-logo.svg"
            alt=""
            class="rtl:scale-x-[-1] hidden dark:block"
          />
          <h2 class="text-primaryLight dark:text-primaryDark font-bold">
            {{ $t("ShopCart") }}
          </h2>
        </div>
        <button
          class=""
          type="button"
          data-drawer-target="drawer-navigation"
          data-drawer-show="drawer-navigation"
          aria-controls="drawer-navigation"
        >
          <span class="material-icons text-2xl dark:text-white"> menu </span>
        </button>
      </div>
    </div>
    <div
      id="drawer-navigation"
      class="fixed top-0 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800 flex flex-col space-y-4"
      aria-labelledby="drawer-navigation-label"
    >
      <button
        type="button"
        data-drawer-hide="drawer-navigation"
        aria-controls="drawer-navigation"
        class="self-end"
      >
        <span class="material-icons text-2xl dark:text-white"> close </span>
      </button>

      <form class="max-w-md mx-auto">
        <div class="relative">
          <div
            class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
          >
            <span class="material-icons"> search </span>
          </div>
          <input
            type="search"
            id="default-search"
            class="block w-full p-4 ps-10 text-sm text-onSecondaryLight dark:text-onSecondaryDark rounded-xl bg-secondaryLight dark:bg-secondaryDark border-none"
            placeholder="Search"
            required
          />
        </div>
      </form>

      <ul class="flex flex-col space-y-4 text-black dark:text-white">
        <li>{{ $t("Categories") }}</li>
        <li>{{ $t("Deals") }}</li>
        <li>{{ $t("What's New") }}</li>
        <li>{{ $t("Delivery") }}</li>
        <li>{{ $t("Cart") }}</li>
        <li>{{ $t("Account") }}</li>
        <li>{{ $t("Contact") }}</li>
      </ul>

      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>

    <div
      class="p-6 flex flex-col justify-center content-center text-center space-y-4"
    >
      <h1
        class="text-primaryLight dark:text-primaryDark text-4xl leading-relaxed"
      >
        {{ $t("Shopping And Department Store") }}
      </h1>
      <p class="dark:text-white text-sm">
        {{ $t("bannerDescription") }}
      </p>
      <img src="../assets/images/banner.png" alt="" class="w-1/2 self-center" />

      <button
        class="bg-primaryLight w-fit self-center p-2 rounded-xl px-4 dark:bg-primaryDark text-white dark:text-black"
      >
        {{ $t("learnMore") }}
      </button>
    </div>
  </div>
</template>
