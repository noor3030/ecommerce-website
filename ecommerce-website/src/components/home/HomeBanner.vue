<template>
  <div
    class="p-6 flex flex-col justify-center content-center text-center space-y-4"
  >
    <h1
      class="text-primaryLight dark:text-primaryDark text-4xl leading-relaxed"
    >
      {{ $t("Shopping And Department Store") }}
    </h1>
    <p class="text-[rgb(0,0,0)] dark:text-[#fff] text-sm">
      {{ $t("bannerDescription") }}
    </p>
    <img src="@/assets/images/banner.png" alt="" class="w-1/2 self-center" />

    <button
      class="bg-primaryLight w-fit self-center p-2 rounded-3xl px-4 dark:bg-primaryDark text-[#fff] dark:text-black"
    >
      {{ $t("learnMore") }}
    </button>
  </div>
</template>
<script setup lang="ts"></script>
