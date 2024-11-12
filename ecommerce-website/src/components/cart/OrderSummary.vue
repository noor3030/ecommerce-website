<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const paymentMethods = ref([
  {
    id: 1,
    name: t("Cash on Delivery"),
  },
  {
    id: 2,
    name: t("Credit or Debit card"),
  },
]);

const selectedMethod = ref<number | null>(null);
</script>

<template>
  <div
    style="border: 1px solid; border-color: gray"
    class="rounded-2xl p-4 flex flex-col space-y-4"
  >
    <h1>{{ $t("Order Summary") }}</h1>
    <div
      class="flex w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white justify-between"
    >
      <input
        type="number"
        class="bg-gray-50 text-gray-900 text-sm rounded-3xl block p-2.5 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-0"
      />
      <button
        class="bg-primaryLight dark:bg-primaryDark text-[#fff] dark:text-[#000] rounded-3xl p-2.5"
      >
        {{ $t("Apply Coupon") }}
      </button>
    </div>
    <div
      v-for="method in paymentMethods"
      :key="method.id"
      class="flex space-x-2 items-center rtl:space-x-reverse"
    >
      <input
        type="radio"
        :id="method.id.toString()"
        name="paymentMethod"
        class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        v-model="selectedMethod"
        :value="method.id"
      />
      <label :for="method.id.toString()" class="text-[#000] dark:text-[#fff]">
        {{ method.name }}
      </label>
    </div>
    <div v-if="selectedMethod === 2">
      <form action="">
        <input
          type="text"
          class="credit-input"
          required
          :placeholder="$t('Card Holder Number')"
        />

        <input
          type="text"
          class="credit-input"
          required
          placeholder="Card Number"
        />

        <input
          type="text"
          class="credit-input"
          required
          placeholder="Expiration Date"
        />

        <input type="text" class="credit-input" required placeholder="CVV" />
      </form>
    </div>
    <div class="flex justify-between items-center text-[#000] dark:text-[#fff]">
      <h1>{{ $t("Sub Total") }}</h1>
      <h1>100,000 IQD</h1>
    </div>
    <div class="flex justify-between items-center text-[#000] dark:text-[#fff]">
      <h1>{{ $t("Tax(10%)") }}</h1>
      <h1>5,000 IQD</h1>
    </div>
    <div class="flex justify-between items-center text-[#000] dark:text-[#fff]">
      <h1>{{ $t("Coupon Discount") }}</h1>
      <h1>5,000 IQD</h1>
    </div>
    <div class="flex justify-between items-center text-[#000] dark:text-[#fff]">
      <h1>{{ $t("Shipping Cost") }}</h1>
      <h1>0,000 IQD</h1>
    </div>
    <VDivider></VDivider>
    <div class="flex justify-between items-center text-[#000] dark:text-[#fff]">
      <h1>{{ $t("Total") }}</h1>
      <h1>100,000 IQD</h1>
    </div>
    <button class="bg-primaryLight dark:bg-primaryDark rounded-3xl p-2.5 text-[#fff] dark:text-[#000]">
      {{ $t("Pay") }}
    </button>
  </div>
</template>

<style>
.credit-input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-2;
}
</style>
