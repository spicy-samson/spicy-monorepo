import { defineStore } from "pinia";
import type { Product } from "../../../shared/types";

type CartItem = Product & { quantity: number };

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartItem[],
    isModalOpen: false,
    total: 0,
  }),
  actions: {
    addToCart(product: Product) {
      const existing = this.items.find((p) => p.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.updateTotal();
    },
    removeFromCart(productId: number) {
      this.items = this.items.filter((p) => p.id !== productId);
      this.updateTotal();
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    decreaseQuantity(productId: number) {
      const item = this.items.find((p) => p.id === productId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          this.removeFromCart(productId);
          return;
        }
        this.updateTotal();
      }  
    },
    updateTotal() {
      this.total = this.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
  },
  getters: {
    totalCount(state) {
      return state.items.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
});
