<script setup lang="ts">
import { onMounted, ref } from "vue";
import { cart } from "@/includes/firebase";
import { QuerySnapshot, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";

const cartList = ref<DocumentData[]>([]);
const cartItems = ref<{ image: string }[]>([]);
const cartTotal = ref(0);

const getCartItems = async () => {
  const cartData: QuerySnapshot<DocumentData> = await getDocs(cart);
  cartData.forEach((doc) => {
    cartList.value.push({
      id: doc.id,
      ...doc.data().product,
    });
  });
};

onMounted(async () => {
  await getCartItems();
  for (const item of cartList.value) {
    console.log(item.product);
    cartItems.value.push(item.product);
    console.log("items", cartItems.value);
    for (const cartItem of cartItems.value) {
      console.log("image", cartItem.image);
    }
  }
});
const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <div class="p-6 flex flex-col space-y-4">
    <h1>{{ $t("Review Items And Shipping") }}</h1>

    <div class="flex flex-col space-y-2">
      <div
        v-for="item in cartList"
        style="border: 1px solid; border-color: gray"
        class="rounded-2xl p-4 flex"
      >
        <div class="flex space-x-2 rtl:space-x-reverse">
          <div
            class="bg-secondaryLight dark:bg-secondaryDark w-1/3 p-2 rounded-2xl"
          >
            <img :src="item.image" class="w-full" />
          </div>
          <div>
            <h1 class="hidden rtl:block text-[#000] dark:text-[#fff]">
              {{ item.arTitle }}
            </h1>
            <h1 class="rtl:hidden text-[#000] dark:text-[#fff]">
              {{ item.enTitle }}
            </h1>
            <p class="rtl:hidden">{{ formatPrice(item.price) }} IQD</p>
            <p class="rtl:block hidden">{{ formatPrice(item.price) }} د.ع</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
