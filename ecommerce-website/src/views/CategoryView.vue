<script setup lang="ts">
import ProductsFilters from "@/components/ProductsFilters.vue";
import { ref } from "vue";
import { onMounted, computed } from "vue";
import { QuerySnapshot, collection, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { categories } from "@/includes/firebase";
import ProductCard from "@/components/ProductCard.vue";
import { useI18n } from "vue-i18n";

const { locale } = useI18n();
const filters = ref([
  {
    enName: "Price",
    arName: "السعر",
    enValues: [
      { name: "Under $50", value: "0-50" },
      { name: "$50 - $100", value: "50-100" },
      { name: "$100 - $200", value: "100-200" },
      { name: "Over $200", value: "200-10000" },
    ],
    arValues: [
      { name: "أقل من 50 دولار", value: "0-50" },
      { name: "50 - 100 دولار", value: "50-100" },
      { name: "100 - 200 دولار", value: "100-200" },
      { name: "أكثر من 200 دولار", value: "200-10000" },
    ],
  },
  {
    enName: "Color",
    arName: "اللون",
    enValues: [
      { name: "Black", value: "black" },
      { name: "White", value: "white" },
      { name: "Red", value: "red" },
      { name: "Blue", value: "blue" },
      { name: "Green", value: "green" },
      { name: "Yellow", value: "yellow" },
      { name: "Pink", value: "pink" },
      { name: "Purple", value: "purple" },
      { name: "Orange", value: "orange" },
      { name: "Brown", value: "brown" },
      { name: "Gray", value: "gray" },
      { name: "Gold", value: "gold" },
      { name: "Silver", value: "silver" },
    ],
    arValues: [
      { name: "أسود", value: "black" },
      { name: "أبيض", value: "white" },
      { name: "أحمر", value: "red" },
      { name: "أزرق", value: "blue" },
      { name: "أخضر", value: "green" },
      { name: "أصفر", value: "yellow" },
      { name: "وردي", value: "pink" },
      { name: "أرجواني", value: "purple" },
      { name: "برتقالي", value: "orange" },
      { name: "بني", value: "brown" },
      { name: "رمادي", value: "gray" },
      { name: "ذهبي", value: "gold" },
      { name: "فضي", value: "silver" },
    ],
  },
  {
    enName: "Reviews",
    arName: "التقييمات",
    enValues: [
      { name: "1 Star", value: "1" },
      { name: "2 Star", value: "2" },
      { name: "3 Star", value: "3" },
      { name: "4 Star", value: "4" },
      { name: "5 Star", value: "5" },
    ],
    arValues: [
      { name: "نجمة 1", value: "1" },
      { name: "نجمة 2", value: "2" },
      { name: "نجمة 3", value: "3" },
      { name: "نجمة 4", value: "4" },
      { name: "نجمة 5", value: "5" },
    ],
  },
  {
    enName: "Brand",
    arName: "العلامة التجارية",
    enValues: [
      { name: "Apple", value: "apple" },
      { name: "Samsung", value: "samsung" },
      { name: "Sony", value: "sony" },
      { name: "JBL", value: "jbl" },
      { name: "Bose", value: "bose" },
      { name: "Beats", value: "beats" },
    ],
    arValues: [
      { name: "أبل", value: "apple" },
      { name: "سامسونج", value: "samsung" },
      { name: "سوني", value: "sony" },
      { name: "جي بي إل", value: "jbl" },
      { name: "بوز", value: "bose" },
      { name: "بيتس", value: "beats" },
    ],
  },
]);

interface HeadPhons {
  id: string;
  [key: string]: any;
}

const headPhonsList = ref<HeadPhons[]>([]);
const page = ref(1);
const perPage = ref(2);

onMounted(async () => {
  const HeadPhonsDate: QuerySnapshot<DocumentData> = await getDocs(categories);
  for (const doc of HeadPhonsDate.docs) {
    const subCollectionRef = collection(doc.ref, "headPhons");
    const subCollectionData: QuerySnapshot<DocumentData> = await getDocs(
      subCollectionRef
    );
    const subCollectionItems = subCollectionData.docs.map((subDoc) => ({
      id: subDoc.id,
      ...subDoc.data(),
    }));

    headPhonsList.value = [...headPhonsList.value, ...subCollectionItems];
  }
});

const filteredHeadPhons = computed(() => {
  return headPhonsList.value.slice(
    (page.value - 1) * perPage.value,
    page.value * perPage.value
  );
});

const totalPages = computed(() => {
  return Math.ceil(headPhonsList.value.length / perPage.value);
});
const isRtl = computed(() => {
  return locale.value === "ar";
});
</script>

<template>
  <div class="space-y-6 pt-2">
    <div class="px-6 pt-6 bg-beigeLight dark:bg-beigeDark flex items-center">
      <div class="flex flex-col space-y-4 pb-6">
        <h1 class="font-bold text-primaryLight dark:text-primaryDark text-xl">
          {{ $t("Grab Up to 50% Off On Selected HeadPhone") }}
        </h1>
        <button
          class="bg-primaryLight w-fit p-2 rounded-3xl px-4 dark:bg-primaryDark text-white dark:text-black"
        >
          {{ $t("shopNow") }}
        </button>
      </div>
      <img src="../assets/images/People.png" alt="" class="w-1/2" />
    </div>
    <ProductsFilters :filters="filters" />
    <section class="container px-6 space-y-4">
      <h1 class="dark:text-white text-xl text-center">
        {{ $t("HeadPhons For You") }}
      </h1>
      <div v-for="headPhon in filteredHeadPhons" :key="headPhon.id">
        <ProductCard :product="headPhon" :ifShow="true" />
      </div>
    </section>

    <v-pagination
      v-model="page"
      :length="totalPages"
      rounded="circle"
      nextIcon="mdi-chevron-left"
      prevIcon="mdi-chevron-right"
      class="hidden rtl:block"
    ></v-pagination>

    <v-pagination
      v-model="page"
      :length="totalPages"
      rounded="circle"
      nextIcon="mdi-chevron-right"
      prevIcon="mdi-chevron-left"
      class="block rtl:hidden"
    ></v-pagination>
  </div>
</template>
