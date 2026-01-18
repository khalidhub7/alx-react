// ZUSTAND MASTERY — LEVEL 6 PRACTICE
// use only Level 6 learned concepts (middleware: persist & devtools)
/*
ZUSTAND — middleware design patterns:

- persist only CORE state
- split persistent vs runtime (in-memory only) state
- feature-scoped middleware (per store)
- minimal persist surface using partialize
- correct middleware composition order (devtools → persist)
- devtools with clear, named actions
- no persistence for UI / temporary state
- safe persistence mindset (versioning awareness)
- scalable, production-ready store design
*/

import { create } from "zustand";
import { addItemReducer, removeItemReducer } from "./helpers";
import { persist, devtools } from "zustand/middleware";

const initialState = {
  // CORE (persist)
  user: null,
  token: null,
  cartItems: [],

  // RUNTIME (in-memory only)
  isCheckoutOpen: false,
  loading: false,
  error: null,
};

const useEcommerceStore = create(
  devtools(
    persist(
      // state creator
      (set, get) => ({
        // state
        ...initialState,

        // actions
        login: (user, token) => {
          // keep action name clear for devtools
          set({ user, token }, false, "auth/login");
        },

        logout: () => {
          // (reset store safely) runtime + persistent state
          set(initialState, false, "auth/logout");
          // u can do also 'persist.clearStorage()'
        },

        // cart
        addToCart: (product) => {
          set((state) => addItemReducer(product, state), false, "cart/add");
        },

        removeFromCart: (productId) => {
          set(
            (state) => removeItemReducer(productId, state),
            false,
            "cart/remove",
          );
        },

        // runtime state only
        openCheckout: () => {
          set({ isCheckoutOpen: true }, false, "ui/openCheckout");
        },

        closeCheckout: () => {
          set({ isCheckoutOpen: false }, false, "ui/closeCheckout");
        },
      }),
      // options
      {
        name: "ecommerce-store",

        // Persist ONLY core state
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          cartItems: state.cartItems,
        }),
        // add versioning strategy
        version: 1,
      },
    ),
  ),
);

export default useEcommerceStore;
