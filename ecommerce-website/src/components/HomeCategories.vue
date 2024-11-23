<script setup lang="ts">
import { categories } from "@/includes/firebase";
import { ref } from "vue";
import { onMounted } from "vue";
import { getDocs, QuerySnapshot } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import router from "@/router";

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
  <section class="container px-6 space-y-4">
    <h1 class="dark:text-white text-xl text-center">
      {{ $t("Shop Our Top Categories") }}
    </h1>
    <div
      class="grid grid-cols-2 gap-y-4 justify-items-center place-items-center"
    >
      <router-link
        v-for="category in categoriesList"
        :key="category.id"
        :to="`/category/${category.id}`"
        class="flex flex-col w-11/12"
      >
        <div class="space-y-1">
          <img :src="category.image" alt="" class="rounded-xl" />
          <h2 class="dark:text-white text-xl text-center rtl:hidden">
            {{ category.name }}
          </h2>
          <h2 class="dark:text-white text-xl text-center hidden rtl:block">
            {{ category.arName }}
          </h2>
        </div>
      </router-link>
    </div>
  </section>
</template>
