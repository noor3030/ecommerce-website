<script setup lang="ts">
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
  <section class="container px-6 space-y-4">
    <h1 class="dark:text-white text-xl text-center">
      {{ $t("Shop Our Top Categories") }}
    </h1>
    <div class="flex flex-col space-y-4 justify-center content-center">
      <div v-for="category in categoriesList" class="space-y-2">
        <img
          :src="category.image"
          alt=""
          class="rounded-xl self-center w-full"
        />
        <h2 class="dark:text-white text-xl text-center rtl:hidden">
          {{ category.name }}
        </h2>
        <h2 class="dark:text-white text-xl text-center hidden rtl:block">
          {{ category.arName }}
        </h2>
      </div>
    </div>
  </section>
</template>
