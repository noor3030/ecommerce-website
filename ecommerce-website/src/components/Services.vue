<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { getDocs, QuerySnapshot } from "firebase/firestore";
import { services } from "@/includes/firebase";
import type { DocumentData } from "firebase/firestore";

interface Service {
  id: string;
  [key: string]: any;
}

const servicesList = ref<Service[]>([]);

onMounted(async () => {
  const servicesData: QuerySnapshot<DocumentData> = await getDocs(services);
  servicesData.forEach((doc) => {
    servicesList.value.push({
      id: doc.id,
      ...doc.data(),
    });
  });
});
</script>

<template>
  <section class="container px-6 space-y-4">
    <h1 class="dark:text-white text-xl text-center">
      {{ $t("Services To Help You Shop") }}
    </h1>

    <div class="flex flex-col space-y-4">
      <div
        v-for="service in servicesList"
        class="bg-secondaryLight dark:bg-secondaryDark text-black dark:text-white rounded-2xl space-y-4 flex flex-col pt-0 h-fit w-fit"
      >
        <div class="p-4">
          <h1 class="hidden rtl:block font-bold">{{ service.arTitle }}</h1>
          <h1 class="block rtl:hidden font-bold">{{ service.enTitle }}</h1>
          <p class="hidden rtl:block text-sm">{{ service.arDescription }}</p>
          <p class="block rtl:hidden text-sm">{{ service.enDescription }}</p>
        </div>

        <img :src="service.image" alt="" class="w-full h-full rounded-b-xl" />
      </div>
    </div>
  </section>
</template>
