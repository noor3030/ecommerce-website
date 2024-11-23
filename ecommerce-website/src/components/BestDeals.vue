<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { getDocs, QuerySnapshot } from "firebase/firestore";
import { bestDeals } from "@/includes/firebase";
import type { DocumentData } from "firebase/firestore";
import ProductCard from "./ProductCard.vue";

interface BestDeal {
  id: string;
  [key: string]: any;
}

const bestDealsList = ref<BestDeal[]>([]);

onMounted(async () => {
  const bestDealsData: QuerySnapshot<DocumentData> = await getDocs(bestDeals);
  bestDealsData.forEach((doc) => {
    bestDealsList.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
});
</script>

<template>
  <section class="container px-6 space-y-4">
    <h1 class="dark:text-white text-xl text-center">
      {{ $t("Today best Deals For You!") }}
    </h1>
    <div
      class="grid grid-cols-2 gap-y-5 justify-items-center place-items-center"
    >
      <div
        v-for="bestDeal in bestDealsList"
        class="w-11/12 flex flex-col space-y-1"
      >
        <ProductCard :product="bestDeal" :ifShow="false" />
      </div>
    </div>
  </section>
</template>
