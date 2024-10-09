<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { getDocs, QuerySnapshot } from "firebase/firestore";
import { advertisements } from "@/includes/firebase";
import type { DocumentData } from "firebase/firestore";

interface Advertisement {
  id: string;
  [key: string]: any;
}

const advertisementsList = ref<Advertisement[]>([]);
onMounted(async () => {
  const advertisementsData: QuerySnapshot<DocumentData> = await getDocs(
    advertisements
  );
  advertisementsData.forEach((doc) => {
    advertisementsList.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
});
</script>

<template>
  <div class="flex flex-col space-y-4 px-6">
    <div
      class="bg-secondaryLight dark:bg-secondaryDark rounded-2xl flex flex-col"
      v-for="advertisement in advertisementsList"
    >
      <img :src="advertisement.image" alt="" class="rounded-t-2xl" />

      <div class="flex flex-col p-4 space-y-1.5">
        <h2 class="text-[#000] dark:text-[#fff] font-bold block rtl:hidden">
          {{ advertisement.enTitle }}
        </h2>
        <h2 class="text-[#000] dark:text-[#fff] font-bold hidden rtl:block">
          {{ advertisement.arTitle }}
        </h2>
        <p
          class="text-onSecondaryLight dark:text-onSecondaryDark hidden rtl:block"
        >
          {{ advertisement.arSubtitle }}
        </p>
        <p
          class="text-onSecondaryLight dark:text-onSecondaryDark block rtl:hidden"
        >
          {{ advertisement.enSubtitle }}
        </p>
        <button class="bg-[#000] dark:bg-[#fff] text-[#fff] dark:text-[#000] rounded-3xl py-2 w-1/3" >{{ $t("shopNow") }}</button>
      </div>
    </div>
  </div>
</template>
