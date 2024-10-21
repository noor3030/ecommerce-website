import { defineStore } from "pinia";
import { db } from "@/includes/firebase";
import { doc, updateDoc } from "firebase/firestore";
export const useCartStore = defineStore({
  id: "cart",
  actions: {
    async updateQuantity(
      newQuantity: number,
      categoryId: any,
      itemId: any,
      categoryName: any
    ) {
      try {
        const docRef = doc(
          db,
          "Categories",
          categoryId,
          categoryName,
          itemId.toString()
        );
        await updateDoc(docRef, { quantity: newQuantity });
        console.log("Quantity updated successfully");
      } catch (e) {
        console.error("Error updating quantity:", e);
      }
    },
  },
});
