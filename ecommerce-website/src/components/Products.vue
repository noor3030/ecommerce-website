<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { QuerySnapshot, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { products } from "@/includes/firebase";
import ProductCard from "@/components/ProductCard.vue";
interface Products {
  id: string;
  [key: string]: any;
}
const productsList = ref<Products[]>([]);

onMounted(async () => {
  const productData: QuerySnapshot<DocumentData> = await getDocs(products);
  productData.forEach((doc) => {
    productsList.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
});
const props = defineProps({
  title: String,
});
</script>

<template>
  <section class="container px-6 space-y-4">
    <h1 class="dark:text-white text-xl text-center">
      {{ title }}
    </h1>
    <div v-for="product in productsList">
      <ProductCard :product="product" :ifShow="false" />
    </div>
  </section>
</template>
