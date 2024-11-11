<script setup lang="ts">
import { onMounted, ref } from "vue";
import { cart } from "@/includes/firebase";
import {
  QuerySnapshot,
  getDocs,
  setDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { db } from "@/includes/firebase";
import { doc, updateDoc } from "firebase/firestore";

const cartList = ref<DocumentData[]>([]);
const user = {
  firstName: "",
  lastName: "",
  address: "",
  phone: 0,
  email: "",
};

async function submitForm() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phone: user.phone,
      email: user.email,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}
const getCartItems = async () => {
  const cartData: QuerySnapshot<DocumentData> = await getDocs(cart);
  cartData.forEach((doc) => {
    cartList.value.push({
      id: doc.id,
      ...doc.data().product,
    });
  });
};

const updateQuantity = async (item: any) => {
  try {
    const docRef = doc(db, "cart", item.id);
    await updateDoc(docRef, { "product.quantity": item.quantity });
  } catch (e) {
    console.error("Error updating document:", e);
  }
};

const plusCounter = async (item: any) => {
  const cartItem = cartList.value.find((i) => i.id === item.id);
  if (cartItem && cartItem.quantity < 10) {
    cartItem.quantity++;
    await updateQuantity(cartItem);
  }
};

const minusCounter = async (item: any) => {
  const cartItem = cartList.value.find((i) => i.id === item.id);
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity--;
    await updateQuantity(cartItem);
  }
};

onMounted(() => {
  getCartItems();
});

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <div class="p-6 flex flex-col space-y-10">
    <div class="flex flex-col space-y-4">
      <h1>{{ $t("Review Items And Shipping") }}</h1>
      <div
        v-for="item in cartList"
        :key="item.id"
        style="border: 1px solid; border-color: gray"
        class="rounded-2xl p-4 flex"
      >
        <div class="flex space-x-4 rtl:space-x-reverse">
          <div
            class="bg-secondaryLight dark:bg-secondaryDark w-1/3 p-2 rounded-2xl"
          >
            <img :src="item.image" class="w-full" />
          </div>
          <div class="flex flex-col space-y-2">
            <h1 class="hidden rtl:block text-[#000] dark:text-[#fff]">
              {{ item.arTitle }}
            </h1>
            <h1 class="rtl:hidden text-[#000] dark:text-[#fff]">
              {{ item.enTitle }}
            </h1>
            <p class="rtl:hidden">{{ formatPrice(item.price) }} IQD</p>
            <p class="rtl:block hidden">{{ formatPrice(item.price) }} د.ع</p>
            <div
              class="bg-secondaryLight dark:bg-secondaryDark text-onSecondaryLight dark:text-onSecondaryDark rounded-3xl p-2 w-fit flex space-x-4 px-4 rtl:space-x-reverse"
            >
              <button @click="plusCounter(item)">
                <v-icon icon="mdi-plus"> </v-icon>
              </button>
              <p>{{ item.quantity }}</p>
              <button @click="minusCounter(item)">
                <v-icon icon="mdi-minus"> </v-icon>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col space-y-4">
      <h1>{{ $t("Delivery Information") }}</h1>
      <form>
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >First name</label
            >
            <input
              type="text"
              id="first_name"
              class="delivery-input"
              required
              v-model="user.firstName"
            />
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Last name</label
            >
            <input
              type="text"
              id="last_name"
              class="delivery-input"
              required
              v-model="user.lastName"
            />
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Address</label
            >
            <input
              type="text"
              id="address"
              class="delivery-input"
              required
              v-model="user.address"
            />
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Phone number</label
            >
            <div class="flex items-center">
              <button
                class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
                type="button"
              >
                +964
              </button>

              <input
                type="text"
                id="phone-input"
                class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
                pattern="07[0-9]{9}"
                required
                v-model="user.phone"
              />
            </div>
          </div>
        </div>
        <div class="mb-6">
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            type="email"
            id="email"
            class="delivery-input"
            required
            v-model="user.email"
          />
        </div>

        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="green-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
          <label
            class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >I agree with the
            <a href="#" class="text-green-500 hover:underline dark:green-500"
              >terms and conditions</a
            >.</label
          >
        </div>
        <!-- <button
          @click.prevent="submitForm"
          type="submit"
          class="bg-primaryLight hover:bg-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primaryDark dark:hover:bg-green-500"
        >
          <span class="text-[#fff] dark:text-[#000]"> Submit </span>
        </button> -->
      </form>
    </div>
  </div>
</template>

<style>
.delivery-input {
  @apply bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}
</style>
