<script setup lang="ts">
import { onMounted, ref } from "vue";
import { cart } from "@/includes/firebase";
import { QuerySnapshot, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "@/includes/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

const cartList = ref<DocumentData[]>([]);
const counter = ref(1);

const getCartItems = async () => {
  const cartData: QuerySnapshot<DocumentData> = await getDocs(cart);
  cartData.forEach((doc) => {
    cartList.value.push({
      id: doc.id,
      ...doc.data().product,
    });
  });
};

const updateQuantity = async (item: any) => {
  try {
    const docRef = doc(db, "cart", item.id);
    await updateDoc(docRef, { "product.quantity": item.quantity });
  } catch (e) {
    console.error("Error updating document:", e);
  }
};

const plusCounter = async (item: any) => {
  const cartItem = cartList.value.find((i) => i.id === item.id);
  if (cartItem && cartItem.quantity < 10) {
    cartItem.quantity++;
    await updateQuantity(cartItem);
  }
};

const minusCounter = async (item: any) => {
  const cartItem = cartList.value.find((i) => i.id === item.id);
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity--;
    await updateQuantity(cartItem);
  }
};

onMounted(() => {
  getCartItems();
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
        :key="item.id"
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
  </div>
</template>