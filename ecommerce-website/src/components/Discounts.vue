<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { getDocs, QuerySnapshot } from "firebase/firestore";
import { discounts } from "@/includes/firebase";
import type { DocumentData } from "firebase/firestore";

interface Discount {
  id: string;
  [key: string]: any;
}

const discountsList = ref<Discount[]>([]);

onMounted(async () => {
  const discountsData: QuerySnapshot<DocumentData> = await getDocs(discounts);
  discountsData.forEach((doc) => {
    discountsList.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
});

const currentTheme = ref("");
onMounted(() => {
  currentTheme.value = localStorage.getItem("theme") || "light";
});
</script>

<template>
  <section class="container px-6 space-y-4">
    <h1 class="dark:text-white text-xl text-center">
      {{ $t("Get Up 70% Off") }}
    </h1>

    <div class="grid grid-cols-1 space-y-4">
      <div v-for="discount in discountsList" class="rounded-2xl">
        <div
          class="flex flex-col space-y-2 rounded-xl"
          :style="{ backgroundColor: discount.bgLight, '--tw-bg-opacity': 1 }"
          :class="{ 'dark:bg-opacity-100': true }"
        >
          <div class="p-4 flex flex-col space-y-2">
            <h1 class="font-bold text-xl">{{ $t("save") }}</h1>
            <div class="text-3xl font-bold">
              <h1
                class="block rtl:hidden"
                :style="{ color: discount.textLight, '--tw-text-opacity': 1 }"
                :class="{ 'dark:text-opacity-100': true }"
              >
                {{ discount.price }} IQD
              </h1>
              <h1
                class="hidden rtl:block font-bold text-3xl"
                :style="{ color: discount.textLight, '--tw-text-opacity': 1 }"
                :class="{ 'dark:text-opacity-100': true }"
              >
                {{ discount.price }} د.ع
              </h1>
            </div>
            <p class="hidden rtl:block">{{ discount.arTitle }}</p>
            <p class="block rtl:hidden">{{ discount.enTitle }}</p>
          </div>

          <img :src="discount.image" alt="" class="rounded-b-xl" />
        </div>
      </div>
    </div>
  </section>
</template>
