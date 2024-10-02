<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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

const dropdownStates = ref(filters.value.map(() => false));

const toggleDropdown = (index: number) => {
  dropdownStates.value[index] = !dropdownStates.value[index];
};
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
    <div class="px-6 flex justify-start flex-wrap">
      <div class="dropdown" v-for="(filter, index) in filters" :key="index">
        <button
          class="m-1 flex flex-row bg-secondaryLight text-onSecondaryLight dark:bg-secondaryDark dark:text-onSecondaryDark p-2 rounded-xl"
          @click="toggleDropdown(index)"
        >
          <span class="rtl:hidden"> {{ filter.enName }}</span>
          <span class="hidden rtl:block"> {{ filter.arName }}</span>
          <span class="material-icons">keyboard_arrow_down</span>
        </button>

        <ul
          v-if="dropdownStates[index]"
          class="dropdown-content bg-base-100 rounded-box z-[1] p-2 shadow w-40 h-48 overflow-auto flex flex-col space-y-2"
        >
          <li
            v-for="value in filter.enValues"
            class="rtl:hidden"
            :key="value.value"
          >
            <div class="flex space-x-2">
              <input type="checkbox" class="checkbox" />
              <a>{{ value.name }}</a>
            </div>
          </li>
          <li
            v-for="value in filter.arValues"
            class="rtl:block hidden"
            :key="value.value"
          >
            <div class="flex space-x-2">
              <input type="checkbox" class="checkbox" />
              <a>{{ value.name }}</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style></style>
