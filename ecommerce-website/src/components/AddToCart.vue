<script setup lang="ts">
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/includes/firebase";
import { onMounted } from "vue";
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
async function setCart(product2: any) {
  await setDoc(doc(db, "cart", product2.id), {
    product: product2,
  });
}
onMounted(() => {
  console.log(props.product);
});
</script>

<template>
  <div>
    <button
      class="text-[#000] dark:text-[#fff] rounded-3xl p-2.5 text-sm"
      style="border: 1px solid"
      @click="setCart(props.product)"
    >
      {{ $t("Add to Cart") }}
    </button>
  </div>
</template>
