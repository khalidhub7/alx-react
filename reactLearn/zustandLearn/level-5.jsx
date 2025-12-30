// ZUSTAND MASTERY — LEVEL 5 PRACTICE
// use only Level 5 learned concepts (async & side effects)
/*
ZUSTAND — async design patterns:

- predictable async state (loading / success / error)
- async logic lives ONLY in the store
- smart store / dumb components
- optimistic UI updates with rollback
- request guard to prevent race conditions
- single source of truth for async actions
- derived state is calculated, not stored
- clear reset logic (logout / cleanup)
- client state only (no server caching logic)
- scalable, production-ready mindset
*/

import { create } from "zustand";
import { addItem, removeItem } from "./helpers";

const initialState = {
  products: null,
  cartItems: [],
  loadingProducts: false,
  productError: null,
  currentProductsRequestId: null,
};

const useStore = create((set, get) => ({
  // state
  ...initialState,

  // actions

  fetchProducts: async () => {
    try {
      const requestId = crypto.randomUUID();
      set({
        currentProductsRequestId: requestId,
        productError: null,
        loadingProducts: true,
      });
      const res = await fetch("/api/products");
      const products = await res.json();

      // protect against race conditions
      if (get().currentProductsRequestId === requestId) {
        set({ products, loadingProducts: false, productError: null });
      }
    } catch (err) {
      if (get().currentProductsRequestId === requestId) {
        set({ productError: err.message, loadingProducts: false });
      }
      console.log(`err: ${get().productError}`);
    }
  },

  // cart actions
  addToCart: async (product) => {
    // optimistic update (update the UI before the server responds)
    const prevCart = structuredClone(get().cartItems);
    addItem(product, set);

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify(product),
      });
      !res.ok
        ? (() => {
            throw new Error("rollback");
          })()
        : null;
    } catch (_) {
      // request fails → rollback cart state
      set({ cartItems: prevCart });
    }
  },

  removeFromCart: async (productId) => {
    // optimistic remove from cart
    const prevCart = structuredClone(get().cartItems);
    removeItem(productId, set);

    try {
      const res = await fetch("/api/cart", {
        method: "delete",
        body: JSON.stringify(productId),
      });
      !res.ok
        ? (() => {
            throw new Error("rollback");
          })()
        : null;
    } catch (_) {
      // request fails → rollback cart state
      set({ cartItems: prevCart });
    }
  },

  // derived state
  // totalItems: () => {} // let cmnt it, do not store derived state

  // reset
  logout: () => set(initialState),
}));

export default useStore;
