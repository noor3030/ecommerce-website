<script setup lang="ts">
import { ref } from "vue";
import AddToCart from "./cart/AddToCart.vue";

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
  
    <div
      class="bg-secondaryLight dark:bg-secondaryDark rounded-xl p-2 flex flex-col"
    >
      <div>
        <v-icon
          icon="mdi-heart-outline"
          class="dark:text-[#fff]"
          size="18"
        ></v-icon>
      </div>
      <img :src="product.image" alt="" class="w-full self-center" />
    </div>
    <div>
      <div class="flex flex-col text-[#000] dark:text-[#fff] pt-4 space-y-1">
        <h2 class="rtl:hidden font-bold text-sm">
          {{ product.enTitle }}
        </h2>
        <h2 class="hidden rtl:block font-bold text-xl">
          {{ product.arTitle }}
        </h2>
        <h2 class="font-bold text-sm rtl:block hidden">
          {{ formatPrice(product.price) }} د.ع
        </h2>
        <h2 class="font-bold text-sm rtl:hidden">
          {{ formatPrice(product.price) }} IQD
        </h2>
      </div>
    </div>
    <!-- <p
      class=" text-onSecondaryLight dark:text-onSecondaryDark text-sm hidden rtl:block "
      v-if="!ifShow"
    >
      {{ product.arDescription }}
    </p>
    <p
      class=" text-onSecondaryLight dark:text-onSecondaryDark text-sm rtl:hidden  "
      v-if="!ifShow"
    >
      {{ product.enDescription }}
    </p>
    <p
      class=" text-onSecondaryLight dark:text-onSecondaryDark text-sm hidden rtl:block"
    >
      {{ product.arSubtitle }}
    </p>
    <p
      class=" text-onSecondaryLight dark:text-onSecondaryDark text-sm rtl:hidden"
    >
      {{ product.enSubtitle }}
    </p> -->
    <div>
      <v-icon
        icon="mdi-star"
        class="text-greenLight dark:text-greenDark"
        size="18"
        v-for="i in product.rate"
      ></v-icon>
    </div>
    <AddToCart :product="product" />

</template>
