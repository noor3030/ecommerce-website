<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { getDocs, QuerySnapshot } from "firebase/firestore";
import { bestDeals } from "@/includes/firebase";
import type { DocumentData } from "firebase/firestore";

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

const formatPrice = (price : number) => {
  // put a coomma every 3 digits
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <section class="container px-6 space-y-4">
    <h1 class="dark:text-white text-xl text-center">
      {{ $t("Today best Deals For You!") }}
    </h1>
    <div class="flex flex-col space-y-8 justify-center content-center">
      <div v-for="bestDeal in bestDealsList" class="space-y-2">
        <div class="bg-secondaryLight dark:bg-secondaryDark rounded-xl p-4">
          <div>
            <span class="material-icons dark:text-white">favorite</span>
          </div>
          <img :src="bestDeal.image" alt="" />
        </div>
        <div>
          <div class="flex text-black dark:text-white justify-between items-center">
            <h2 class="rtl:hidden font-bold text-xl">{{ bestDeal.enTitle }}</h2>
            <h2 class="hidden rtl:block font-bold text-xl">
              {{ bestDeal.arTitle }}
            </h2>
            <h2 class="font-bold text-xl rtl:block hidden">
              {{ formatPrice(bestDeal.price) }} د.ع
            </h2>
            <h2 class="font-bold text-xl rtl:hidden">
              {{ formatPrice(bestDeal.price) }} IQD
            </h2>
          </div>
        </div>
        <p
          class="text-onSecondaryLight dark:text-onSecondaryDark hidden rtl:block"
        >
          {{ bestDeal.arDescription }}
        </p>
        <p class="text-onSecondaryLight dark:text-onSecondaryDark rtl:hidden">
          {{ bestDeal.enDescription }}
        </p>
        <div>
          <span class="material-icons text-greenLight dark:text-greenDark" v-for="i in bestDeal.rate" >
            star
          </span>
        </div>
        <button class="text-black dark:text-white border rounded-2xl p-2.5 dark:border-white border-black">
          {{ $t("Add to Cart") }}
        </button>
      </div>
    </div>
  </section>
</template>
