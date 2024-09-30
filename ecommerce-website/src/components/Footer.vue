<script setup lang="ts">
import Logo from "./Logo.vue";
import { categories } from "@/includes/firebase";
import { ref } from "vue";
import { onMounted } from "vue";
import { getDocs, QuerySnapshot } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";

interface Category {
  id: string;
  [key: string]: any;
}

const categoriesList = ref<Category[]>([]);

onMounted(async () => {
  const categoriesData: QuerySnapshot<DocumentData> = await getDocs(categories);

  categoriesData.forEach((doc) => {
    categoriesList.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
});
</script>

<template>
  <div class="px-6 pt-24 flex flex-col space-y-6">
    <!-- logo -->
    <div class="flex flex-col space-y-2">
      <logo />
      <p class="text-sm">{{ $t("bannerDescription") }}</p>
      <h1>{{ $t("Accepted Payment Methods") }}</h1>
      <div class="flex space-x-2">
        <img src="../assets/images/visa.svg" alt="" class="w-1/5" />
        <img src="../assets/images/zain.svg" alt="" class="w-1/5" />
      </div>
    </div>
    <!-- categories -->

    <div class="flex flex-col space-y-2">
      <h1 class="font-bold">{{ $t("Categories") }}</h1>
      <ul>
        <li v-for="category in categoriesList" class="rtl:hidden block">
          {{ category.name }}
        </li>
        <li v-for="category in categoriesList" class="rtl:block hidden">
          {{ category.arName }}
        </li>
      </ul>
    </div>

    <!-- about us -->
    <div class="flex flex-col space-y-2">
      <h1 class="font-bold">{{ $t("About Us") }}</h1>
      <ul>
        <li>{{ $t("About ShopCart") }}</li>
        <li>{{ $t("News") }}</li>
        <li>{{ $t("Help") }}</li>
        <li>{{ $t("ShopCart brands") }}</li>
      </ul>
    </div>

    <!-- services -->

    <div class="flex flex-col space-y-2">
      <h1 class="font-bold">{{ $t("Services") }}</h1>
      <ul>
        <li>{{ $t("Gift Cards") }}</li>
        <li>{{ $t("Mobile App") }}</li>
        <li>{{ $t("Delivery") }}</li>
        <li>{{ $t("Order Pickup") }}</li>
        <li>{{ $t("Account SignUp") }}</li>
      </ul>
    </div>

    <!-- help -->
    <div class="flex flex-col space-y-2">
      <h1 class="font-bold">{{ $t("Help") }}</h1>
      <ul>
        <li>{{ $t("ShopCart Help") }}</li>
        <li>{{ $t("Returns") }}</li>
        <li>{{ $t("Track Orders") }}</li>
        <li>{{ $t("Contact Us") }}</li>
        <li>{{ $t("Feedback") }}</li>
        <li>{{ $t("Security") }}</li>
      </ul>
    </div>
  </div>
</template>
