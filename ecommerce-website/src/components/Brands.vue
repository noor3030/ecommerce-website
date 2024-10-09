<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { getDocs, QuerySnapshot } from "firebase/firestore";
import { brands } from "@/includes/firebase";
import type { DocumentData } from "firebase/firestore";

interface Brand {
  id: string;
  [key: string]: any;
}

const brandsList = ref<Brand[]>([]);
onMounted(async () => {
  const brandsData: QuerySnapshot<DocumentData> = await getDocs(brands);
  brandsData.forEach((doc) => {
    brandsList.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
});
</script>

<template>
  <section class="container px-6 space-y-4">
    <h1 class="dark:text-white text-xl text-center">
      {{ $t("Choose By Brand") }}
    </h1>

    <div class="grid grid-cols-1 space-y-4">
      <div
        v-for="brand in brandsList"
        class="bg-secondaryLight dark:bg-secondaryDark rounded-2xl flex p-4 justify-between items-center"
      >
        <div>
          <h2 class="text-[#000] dark:text-[#fff] font-bold text-xl">
            {{ brand.name }}
          </h2>
            <p class="text-onSecondaryLight dark:text-onSecondaryDark hidden rtl:block">
                {{ brand.arDescription }}
            </p>
            <p class="text-onSecondaryLight dark:text-onSecondaryDark block rtl:hidden">
                {{ brand.enDescription }}
            </p>
        </div>
        <div
          class="bg-greenLight rounded-full w-[100px] h-[100px] flex items-center justify-center content-center dark:bg-greenDark"
        >
          <img
            :src="brand.lightImage"
            alt=""
            class="w-8/12 block dark:hidden"
          />
          <img :src="brand.darkImage" alt="" class="w-8/12 hidden dark:block" />
        </div>
      </div>
    </div>
  </section>
</template>
