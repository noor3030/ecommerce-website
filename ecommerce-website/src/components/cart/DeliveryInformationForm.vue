<script setup>
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/includes/firebase";
import { useRouter } from "vue-router";
import { reactive } from "vue";
const router = useRouter();

const userFields = reactive([
  {
    input_name: "firstName",
    value: "",
    enLabel: "First Name",
    arLabel: "الاسم الأول",
    validationMessages: "First Name is required.",
    showValidationMessage: false,
    type: "text",
  },
  {
    input_name: "lastName",
    value: "",
    enLabel: "Last Name",
    arLabel: "الكنية",
    validationMessages: "Last Name is required.",
    showValidationMessage: false,
    type: "text",
  },
  {
    input_name: "address",
    value: "",
    enLabel: "Address",
    arLabel: "عنوان",
    validationMessages: "Address is required.",
    showValidationMessage: false,
    type: "text",
  },
  {
    input_name: "phone",
    value: "",
    enLabel: "Phone",
    arLabel: "هاتف",
    validationMessages: "Phone is required.",
    showValidationMessage: false,
    type: "number",
  },
  {
    input_name: "email",
    value: "",
    enLabel: "Email",
    arLabel: "البريد الإلكتروني",
    validationMessages: "Email is required.",
    showValidationMessage: false,
    type: "text",
  },
]);

const validateFields = () => {
  let isValid = true;
  for (const field of userFields) {
    if (!field.value) {
      field.showValidationMessage = true;
      isValid = false;
    } else {
      field.showValidationMessage = false;
    }
  }
  return isValid;
};

const submitForm = async () => {
  if (!validateFields()) {
    console.error("Validation failed. Please fill in all required fields.");
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: userFields.find((u) => u.input_name === "firstName").value,
      lastName: userFields.find((u) => u.input_name === "lastName").value,
      address: userFields.find((u) => u.input_name === "address").value,
      phone: userFields.find((u) => u.input_name === "phone").value,
      email: userFields.find((u) => u.input_name === "email").value,
    });
    console.log("Document written with ID: ", docRef.id);
    router.push("/cart");
  } catch (e) {
    console.error("Error adding document:", e);
  }
};
</script>

<template>
  <div class="flex flex-col space-y-4">
      <h1>{{ $t('Delivery Information') }}</h1>
  <form>
    <div
      class="grid gap-6 mb-6 md:grid-cols-2"
      v-for="user in userFields"
      :key="user.input_name"
    >
      <div v-if="user.type === 'text'">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:hidden"
          >{{ user.enLabel }}</label
        >
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ltr:hidden"
          >{{ user.arLabel }}</label
        >
        <input
          type="text"
          class="delivery-input"
          required
          v-model="user.value"
        />
        <span v-if="user.showValidationMessage" class="text-red-500 text-sm">{{
          user.validationMessages
        }}</span>
      </div>

      <div v-if="user.type === 'number'">
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white rtl:hidden"
          >{{ user.enLabel }}</label
        >
        <label
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white ltr:hidden"
          >{{ user.arLabel }}</label
        >
        <div class="flex items-center">
          <button
            class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            +964
          </button>
          <input
            type="text"
            class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-green-500"
            pattern="07[0-9]{9}"
            required
            v-model="user.value"
          />
        </div>
        <span v-if="user.showValidationMessage" class="text-red-500 text-sm">{{
          user.validationMessages
        }}</span>
      </div>
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
      <label class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >{{ $t("I agree with the") }}
        <a href="#" class="text-green-500 hover:underline dark:green-500">{{
          $t("terms and conditions")
        }}</a></label
      >
    </div>
    <button
      @click.prevent="submitForm"
      type="submit"
      class="bg-primaryLight hover:bg-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-primaryDark dark:hover:bg-green-500"
    >
      <span class="text-[#fff] dark:text-[#000]">{{ $t("Next") }}</span>
    </button>
  </form>
  </div>

</template>
