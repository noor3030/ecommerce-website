<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAb3oHb2Pqos-s95MyKES6mc0RYUqVPMn8",
  authDomain: "ecommerce-website-91cba.firebaseapp.com",
  projectId: "ecommerce-website-91cba",
  storageBucket: "ecommerce-website-91cba.appspot.com",
  messagingSenderId: "23362426185",
  appId: "1:23362426185:web:54cd1b3749ca7497c0f698",
  measurementId: "G-6SXQ5CMB5G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
async function setCart(product: any) {
  await setDoc(doc(db, "cart", product.id), {
    product: product,
    quantity: 1,
  });
}
</script>

<template>
  <div>
    <button
      class="text-[#000] dark:text-[#fff] rounded-3xl p-2.5 text-sm"
      style="border: 1px solid"
      @click="setCart(props.product)"
    >
      {{ $t("Add to Cart") }}
    </button>
  </div>
</template>
