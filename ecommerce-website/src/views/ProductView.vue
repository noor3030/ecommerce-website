<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const headPhon = JSON.parse(route.query.headPhon as string);
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const counter = ref(1);
</script>

<template>
  <div class="p-6 flex flex-col space-y-10">
    <!-- images -->
    <div class="flex-flex-col space-y-4">
      <div
        class="bg-secondaryLight dark:bg-secondaryDark flex flex-col justify-center content-center p-2 rounded-xl"
      >
        <img :src="headPhon.image" alt="" class="w-full" />
      </div>
      <div class="flex w-full justify-between">
        <div
          class="w-[100px] bg-secondaryLight dark:bg-secondaryDark justify-center content-center p-2 rounded-xl"
          v-for="image in headPhon.subImages"
        >
          <img :src="image" alt="" />
        </div>
      </div>
    </div>
    <!-- info -->
    <div>
      <div class="border-b flex flex-col space-y-2 py-2">
        <h1 class="font-bold rtl:hidden">{{ headPhon.enTitle }}</h1>
        <h1 class="font-bold hidden rtl:block">{{ headPhon.arTitle }}</h1>
        <p class="rtl:hidden text-sm">{{ headPhon.enDescription }}</p>
        <p class="hidden rtl:block text-sm">{{ headPhon.arDescription }}</p>
        <div class="flex">
          <v-icon
            icon="mdi-star"
            class="text-greenLight dark:text-greenDark"
            v-for="i in headPhon.rate"
          ></v-icon>
        </div>
      </div>
      <div class="border-b flex flex-col space-y-2 py-2">
        <h1 class="font-bold text-lg rtl:hidden">
          {{ formatPrice(headPhon.price) }} IQD
        </h1>
        <h1 class="font-bold text-lg rtl:block hidden">
          {{ formatPrice(headPhon.price) }} د.ع
        </h1>
      </div>
      <div class="border-b flex space-x-2 py-2">
        <div
          v-for="color in headPhon.colors"
          class="pa-5 rounded-full"
          :style="{ backgroundColor: color }"
        ></div>
      </div>
      <div class="border-b py-2">
        <div
          class="bg-secondaryLight dark:bg-secondaryDark text-onSecondaryLight dark:text-onSecondaryDark rounded-3xl p-2 w-fit flex space-x-4 px-4"
        >
          <v-icon icon="mdi-plus"> </v-icon>
          <p>{{ counter }}</p>
          <v-icon icon="mdi-minus"> </v-icon>
        </div>
      </div>
      <div class="border-b py-2 flex space-x-4">
        <button
          class="bg-primaryLight dark:bg-primaryDark text-[#fff] dark:text-[#000] rounded-xl p-2 px-4"
        >
          {{ $t("Buy Now") }}
        </button>
        <button class="rounded-xl p-2 px-4 border">
          {{ $t("Add to Cart") }}
        </button>
      </div>
    </div>
  </div>
</template>
