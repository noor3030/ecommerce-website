<script setup lang="ts">
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { ref } from "vue";
const currentTheme = ref('');
currentTheme.value = localStorage.getItem('theme') || '';
</script>

<template>
  <div class="flex flex-col space-y-4">
    <nav
      class="bg-primaryLight px-6 py-2 text-center text-white dark:bg-primaryDark dark:text-black flex justify-between items-center"
    >
      <h4>{{ $t('Get 50% off on selected items') }}</h4>
      
      <h4>|</h4>
      <button>{{ $t('shopNow') }}</button>
    </nav>
    <div class="flex px-6 items-center justify-between">
      <div class="flex items-center space-x-2 rtl:space-x-reverse" >
        <img src="../assets/images/logo.svg" alt="" class="rtl:scale-x-[-1]" v-if="currentTheme === 'light'"/>
        <img src="../assets/images/dark-logo.svg" alt="" class="rtl:scale-x-[-1]" v-else/>
        <h2 class="text-primaryLight dark:text-primaryDark font-bold">
          {{$t('ShopCart')}}
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
    class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800 flex flex-col space-y-4"
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
      <li>{{$t('Categories')}}</li>
      <li>{{$t('Deals')}}</li>
      <li>{{$t("What's New")}}</li>
      <li>{{$t('Delivery')}}</li>
      <li>{{$t('Cart')}}</li>
      <li>{{$t('Account')}}</li>
      <li>{{$t('Contact')}}</li>
    </ul>


    <ThemeSwitcher />
    <LanguageSwitcher />
  </div>
</template>
