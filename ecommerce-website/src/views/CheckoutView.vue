<script setup lang="ts">
import { ref } from "vue";
import DeliveryInformationForm from "@/components/cart/DeliveryInformationForm.vue";
</script>

<template>
  <div class="p-6">
    <DeliveryInformationForm />
  </div>
</template>

<style>
.delivery-input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}
</style>