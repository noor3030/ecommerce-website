<script setup lang="ts">
import HomeCategories from "@/components/HomeCategories.vue";
import BestDeals from "@/components/BestDeals.vue";
import Brands from "@/components/Brands.vue";
import Advertisements from "@/components/Advertisements.vue";
import Discounts from "@/components/Discounts.vue";
import Services from "@/components/services.vue";
import HomeBanner from "@/components/HomeBanner.vue";
</script>

<template>
  <div class="flex flex-col space-y-20">
    <HomeBanner />

    <HomeCategories />
    <BestDeals />
    <Brands />
    <div class="bg-beigeLight dark:bg-beigeDark flex p-2 justify-between px-6">
      <div class="flex flex-col space-y-4">
        <h1 class="text-black dark:text-white font-bold">
          {{ $t("Get 5% Cash Back") }}
        </h1>
        <p class="text-primaryLight dark:text-primaryDark">
          {{ $t("on ShopCart.com") }}
        </p>
        <button
          class="rounded-3xl p-2 px-4 bg-primaryLight dark:bg-primaryDark text-beigeLight dark:text-beigeDark"
        >
          {{ $t("learnMore") }}
        </button>
      </div>
      <img src="../assets/images/credit-card.png" alt="" class="w-1/2" />
    </div>
    <Advertisements />
    <Discounts />
    <Services />
  </div>
</template>
