<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  product: {
    id: string;
    [key: string]: any;
  };
  ifShow: boolean;
}>();
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <div>
    <div class="bg-secondaryLight dark:bg-secondaryDark rounded-xl p-4">
      <div>
        <span class="material-icons dark:text-white">favorite</span>
      </div>
      <img :src="product.image" alt="" class="w-full" />
    </div>
    <div>
      <div
        class="flex text-black dark:text-white justify-between items-center pt-4 pb-1"
      >
        <h2 class="rtl:hidden font-bold text-xl">
          {{ product.enTitle }}
        </h2>
        <h2 class="hidden rtl:block font-bold text-xl">
          {{ product.arTitle }}
        </h2>
        <h2 class="font-bold text-xl rtl:block hidden">
          {{ formatPrice(product.price) }} د.ع
        </h2>
        <h2 class="font-bold text-xl rtl:hidden">
          {{ formatPrice(product.price) }} IQD
        </h2>
      </div>
    </div>
    <p
      class="text-onSecondaryLight dark:text-onSecondaryDark hidden rtl:block pb-1"
      v-if="!ifShow"
    >
      {{ product.arDescription }}
    </p>
    <p
      class="text-onSecondaryLight dark:text-onSecondaryDark rtl:hidden pb-1"
      v-if="!ifShow"
    >
      {{ product.enDescription }}
    </p>
    <p
      class="text-onSecondaryLight dark:text-onSecondaryDark hidden rtl:block pb-1"
    >
      {{ product.arSubtitle }}
    </p>
    <p class="text-onSecondaryLight dark:text-onSecondaryDark rtl:hidden pb-1">
      {{ product.enSubtitle }}
    </p>
    <div class="pb-1">
      <span
        class="material-icons text-greenLight dark:text-greenDark"
        v-for="i in product.rate"
      >
        star
      </span>
    </div>
    <button
      class="text-black dark:text-white border rounded-3xl p-2.5 dark:border-white border-black text-sm"
    >
      {{ $t("Add to Cart") }}
    </button>
  </div>
</template>
