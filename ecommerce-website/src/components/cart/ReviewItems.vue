<script setup lang="ts">
import { defineProps } from "vue";
import type { DocumentData } from "firebase/firestore";
const props = defineProps<{
  cartList: DocumentData[];
  plusCounter: (item: any) => void;
  minusCounter: (item: any) => void;
  formatPrice: (price: number) => string;
}>();
</script>

<template>
  <div class="flex flex-col space-y-4">
    <h1 class="text-[#000] dark:text-[#fff]">{{ $t("Review Items And Shipping") }}</h1>
    <div
      v-for="item in cartList"
      :key="item.id"
      style="border: 1px solid; border-color: gray"
      class="rounded-2xl p-4 flex"
    >
      <div class="flex space-x-4 rtl:space-x-reverse">
        <div
          class="bg-secondaryLight dark:bg-secondaryDark w-1/3 p-2 rounded-2xl"
        >
          <img :src="item.image" class="w-full" />
        </div>
        <div class="flex flex-col space-y-2">
          <h1 class="hidden rtl:block text-[#000] dark:text-[#fff]">
            {{ item.arTitle }}
          </h1>
          <h1 class="rtl:hidden text-[#000] dark:text-[#fff]">
            {{ item.enTitle }}
          </h1>
          <p class="rtl:hidden text-[#000] dark:text-[#fff]">{{ formatPrice(item.price) }} IQD</p>
          <p class="rtl:block hidden text-[#000] dark:text-[#fff]">{{ formatPrice(item.price) }} د.ع</p>
          <div
            class="bg-secondaryLight dark:bg-secondaryDark text-onSecondaryLight dark:text-onSecondaryDark rounded-3xl p-2 w-fit flex space-x-4 px-4 rtl:space-x-reverse"
          >
            <button @click="plusCounter(item)">
              <v-icon icon="mdi-plus"> </v-icon>
            </button>
            <p>{{ item.quantity }}</p>
            <button @click="minusCounter(item)">
              <v-icon icon="mdi-minus"> </v-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
