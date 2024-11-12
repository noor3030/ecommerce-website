<script setup lang="ts">
import { onMounted, ref } from "vue";
import { cart } from "@/includes/firebase";
import { QuerySnapshot, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "@/includes/firebase";
import { doc, updateDoc } from "firebase/firestore";
import ReviewItems from "@/components/cart/ReviewItems.vue";
import OrderSummary from "@/components/cart/OrderSummary.vue";

const cartList = ref<DocumentData[]>([]);

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
  <div class="p-6 flex flex-col space-y-10">
    <ReviewItems
      :cartList="cartList"
      :plusCounter="plusCounter"
      :minusCounter="minusCounter"
      :formatPrice="formatPrice"
    />
    <OrderSummary />
  </div>
</template>

<style>

</style>
