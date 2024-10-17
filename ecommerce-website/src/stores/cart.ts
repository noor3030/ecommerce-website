import { defineStore } from "pinia";

export const useCartStore = defineStore({
  id: "cart",
  state: () => {
    return {
      cartList: [] as any[],
      isInCart: false,
    };
  },
  actions: {
    addToCart(item: any) {
      this.cartList.push(item);
      localStorage.setItem("cart", JSON.stringify(this.cartList));
      this.isInCart = true;
    },
    removeFromCart(item: any) {
      const index = this.cartList.findIndex(
        (selectedItem) => selectedItem.id === item.id
      );
      this.cartList.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cartList));
      this.isInCart = false;
    },
    clearCart() {
      this.cartList = [];
      localStorage.setItem("cart", JSON.stringify(this.cartList));
    },
  },
  getters: {
    getCartList():any[] {
      return this.cartList;
    },
    getIsInCart():boolean {
      return this.isInCart;
    }
  },
});
