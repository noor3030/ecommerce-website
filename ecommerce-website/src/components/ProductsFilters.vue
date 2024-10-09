<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  filters: {
    enName: string;
    arName: string;
    enValues: { name: string; value: string }[];
    arValues: { name: string; value: string }[];
  }[];
}>();
const dropdownStates = ref(props.filters.map(() => false));

const toggleDropdown = (index: number) => {
  dropdownStates.value[index] = !dropdownStates.value[index];
};
</script>

<template>
  <div class="px-6 flex justify-start flex-wrap">
    <div class="dropdown" v-for="(filter, index) in filters" :key="index">
      <button
        class="m-1 flex flex-row bg-secondaryLight text-onSecondaryLight dark:bg-secondaryDark dark:text-onSecondaryDark p-2 rounded-xl"
        @click="toggleDropdown(index)"
      >
        <span class="rtl:hidden"> {{ filter.enName }}</span>
        <span class="hidden rtl:block"> {{ filter.arName }}</span>
        <v-icon icon="mdi-chevron-down"></v-icon>
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
</template>
