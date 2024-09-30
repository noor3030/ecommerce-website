<template>
  <div class="flex items-center space-x-2 rtl:space-x-reverse">
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
</template>
