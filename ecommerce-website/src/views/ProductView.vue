<script setup lang="ts">
import AddToCart from "@/components/AddToCart.vue";
import Products from "@/components/Products.vue";
import { ref } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { db } from "@/includes/firebase";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const headPhon = ref<any | null>(null);
const category = ref<any | null>(null);
const route = useRoute();
const categoryId = route.query.categoryId as string;

const formatPrice = (price: number) => {
  return typeof price === "number"
    ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    : "";
};
const id = route.params.id;
const counter = ref(1);
const fetchDocument = async () => {
  try {
    const docRef = doc(
      db,
      "Categories",
      categoryId.toString(),
      "headPhons",
      id.toString()
    );
    const docSnap = await getDoc(docRef);
    headPhon.value = docSnap.data();
  } catch (e) {
    console.error("Error fetching document:", e);
  }
};
onMounted(async () => {
  await fetchDocument();
});

const updateQuantity = async (newQuantity: number) => {
  try {
    const docRef = doc(
      db,
      "Categories",
      categoryId,
      "headPhons",
      id.toString()
    );
    await updateDoc(docRef, { quantity: newQuantity });
    console.log("Quantity updated successfully");
  } catch (e) {
    console.error("Error updating quantity:", e);
  }
};

const plusCounter = () => {
  if (counter.value !== 10) {
    counter.value++;
    headPhon.value.quantity = counter.value;
    updateQuantity(counter.value);
  }
};

const minusCounter = () => {
  if (counter.value > 1) {
    counter.value--;
    headPhon.value.quantity = counter.value;
    updateQuantity(counter.value);
  }
};

async function setCart(product: any) {
  await setDoc(doc(db, "cart", id.toString()), {
    product: product,
    quantity: product.quantity ? product.quantity + 1 : 1,
  });
}
</script>

<template>
  <div class="p-6 flex flex-col space-y-10">
    <!-- images -->
    <div class="flex-flex-col space-y-4">
      <div
        class="bg-secondaryLight dark:bg-secondaryDark flex flex-col justify-center content-center p-2 rounded-xl"
      >
        <img :src="headPhon?.image" alt="" class="w-full" />
      </div>
      <div class="flex w-full justify-between">
        <div
          class="w-[100px] bg-secondaryLight dark:bg-secondaryDark justify-center content-center p-2 rounded-xl"
          v-for="image in headPhon?.subImages"
        >
          <img :src="image" alt="" />
        </div>
      </div>
    </div>
    <!-- info -->
    <div class="dark:text-[#fff]">
      <div class="border-b flex flex-col space-y-2 py-2">
        <h1 class="font-bold rtl:hidden">{{ headPhon?.enTitle }}</h1>
        <h1 class="font-bold hidden rtl:block">{{ headPhon?.arTitle }}</h1>
        <p class="rtl:hidden text-sm">{{ headPhon?.enDescription }}</p>
        <p class="hidden rtl:block text-sm">{{ headPhon?.arDescription }}</p>
        <div class="flex">
          <v-icon
            icon="mdi-star"
            class="text-greenLight dark:text-greenDark"
            v-for="i in headPhon?.rate"
          ></v-icon>
        </div>
      </div>
      <div class="border-b flex flex-col space-y-2 py-2">
        <h1 class="font-bold text-lg rtl:hidden">
          {{ formatPrice(headPhon?.price) }} IQD
        </h1>
        <h1 class="font-bold text-lg rtl:block hidden">
          {{ formatPrice(headPhon?.price) }} د.ع
        </h1>
      </div>

      <div class="border-b py-2">
        <div
          class="bg-secondaryLight dark:bg-secondaryDark text-onSecondaryLight dark:text-onSecondaryDark rounded-3xl p-2 w-fit flex space-x-4 px-4 rtl:space-x-reverse"
        >
          <button @click="plusCounter">
            <v-icon icon="mdi-plus"> </v-icon>
          </button>
          <p>{{ headPhon?.quantity }}</p>
          <button @click="minusCounter">
            <v-icon icon="mdi-minus"> </v-icon>
          </button>
        </div>
      </div>
      <div class="border-b py-2 flex space-x-4 rtl:space-x-reverse">
        <button
          class="bg-primaryLight dark:bg-primaryDark text-[#fff] dark:text-[#000] rounded-xl p-2 px-4 text-sm"
        >
          {{ $t("Buy Now") }}
        </button>
        <div>
          <button
            v-if="headPhon"
            class="text-[#000] dark:text-[#fff] rounded-3xl p-2.5 text-sm"
            style="border: 1px solid"
            @click="setCart(headPhon)"
          >
            {{ $t("Add to Cart") }}
          </button>
        </div>
      </div>
      <div class="py-2">
        <div class="flex space-x-2 items-center rtl:space-x-reverse">
          <v-icon icon="mdi-truck-fast" color="orange"></v-icon>
          <p>{{ $t("Free Delivery") }}</p>
        </div>
        <a href="" class="underline decoration-1">{{
          $t("Enter your postal code for delivery availability")
        }}</a>
      </div>
    </div>
    <!-- general -->
    <div class="flex flex-col space-y-2 dark:text-[#fff]">
      <h1>
        {{ $t("Apple AirPods Max Wireless Headphones Full Specification") }}
      </h1>
      <div
        class="bg-secondaryLight dark:bg-secondaryDark p-4 rounded-lg space-y-2"
      >
        <h1>{{ $t("General") }}</h1>
        <div
          class="bg-[#fff] dark:bg-[#000] p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Brand") }}</p>
          <p>{{ headPhon?.brand }}</p>
        </div>
        <div
          class="p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Model") }}</p>
          <p class="hidden rtl:block">{{ headPhon?.arModel }}</p>
          <p class="rtl:hidden">{{ headPhon?.enModel }}</p>
        </div>
        <div
          class="bg-[#fff] dark:bg-[#000] p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Release Date") }}</p>
          <p>{{ headPhon?.releaseDate }}</p>
        </div>
        <div
          class="p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Price") }}</p>
          <p class="rtl:hidden">{{ formatPrice(headPhon?.price) }} IQD</p>
          <p class="hidden rtl:block">{{ formatPrice(headPhon?.price) }} د.ع</p>
        </div>
        <div
          class="bg-[#fff] dark:bg-[#000] p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Model number") }}</p>
          <p>{{ headPhon?.modelNumber }}</p>
        </div>
        <div
          class="p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Headphone") }}</p>
          <p class="rtl:hidden">{{ headPhon?.headPhoneEn }}</p>
          <p class="hidden rtl:block">{{ headPhon?.headPhoneAr }}</p>
        </div>
        <div
          class="bg-[#fff] dark:bg-[#000] p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Connectivity") }}</p>
          <p class="rtl:hidden">{{ headPhon?.EnConnectivity }}</p>
          <p class="hidden rtl:block">{{ headPhon?.ArConnectivity }}</p>
        </div>
      </div>
    </div>
    <!-- Product details -->
    <div class="flex flex-col space-y-2 dark:text-[#fff]">
      <div
        class="bg-secondaryLight dark:bg-secondaryDark p-4 rounded-lg space-y-2"
      >
        <h1>{{ $t("Product details") }}</h1>
        <div
          class="bg-[#fff] dark:bg-[#000] p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Microphone") }}</p>
          <p class="rtl:hidden">{{ headPhon?.Enmicrophone }}</p>
          <p class="hidden rtl:block">{{ headPhon?.Armicrophone }}</p>
        </div>
        <div
          class="p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Driver Type") }}</p>
          <p class="hidden rtl:block">{{ headPhon?.arDriverType }}</p>
          <p class="rtl:hidden">{{ headPhon?.enDriverType }}</p>
        </div>
        <div
          class="bg-[#fff] dark:bg-[#000] p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Number of drivers") }}</p>
          <p>{{ headPhon?.numberOfDrivers }}</p>
        </div>
        <div
          class="p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Water Resistant") }}</p>
          <p class="rtl:hidden">{{ headPhon?.enWaterResistant }}</p>
          <p class="hidden rtl:block">{{ headPhon?.arWaterResistant }}</p>
        </div>
        <div
          class="bg-[#fff] dark:bg-[#000] p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Weight (g)") }}</p>
          <p>{{ headPhon?.weight }}</p>
        </div>
        <div
          class="p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Driver size") }}</p>
          <p>{{ headPhon?.driverSize }}</p>
        </div>
        <div
          class="bg-[#fff] dark:bg-[#000] p-1 rounded-lg flex justify-between w-full content-between px-2"
        >
          <p>{{ $t("Battery Life (Hrs)") }}</p>
          <p>{{ headPhon?.batteryLife }}</p>
        </div>
      </div>
    </div>
    <Products :title="$t('Smiler Items Might Like')" />
  </div>
</template>
