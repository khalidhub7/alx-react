// ZUSTAND MASTERY — LEVEL 4 PRACTICE
// use only Level 4 learned concepts
/*
store design & architecture patterns:
- one store per feature (no god store)
- flat state shape (no deep nesting)
- clear separation: state vs actions
- business state ≠ UI state
- minimal state (no derived state stored)
- action-centric logic (components are dumb)
- clean naming & scalability-first mindset
*/

import { create } from "zustand";
import { addItem, clearCart, removeItem } from "./helpers";
import { decreaseQuantity, increaseQuantity } from "./helpers";

const useAuthStore = create((set, _get) => ({
  // state
  user: null,
  isAuthenticated: false,

  // actions
  login: (userData) => set({ user: userData, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));

const useCartStore = create((set, _get) => ({
  // state
  cartItems: [],

  // actions
  addItem: (product) => addItem(product, set),
  removeItem: (id) => removeItem(id, set),
  increaseQuantity: (id) => increaseQuantity(id, set),
  decreaseQuantity: (id) => decreaseQuantity(id, set),
  clearCart: () => clearCart(set),
}));

const useUIStore = create((set) => ({
  // state
  isCartOpen: false,
  isAuthModalOpen: false,
  theme: "light",

  // actions
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

// auth selectors
const selectUser = (state) => state.user;
const selectIsAuthenticated = (state) => state.isAuthenticated;

// cart selectors
const selectCartItems = (state) => state.cartItems;
const selectHasItems = (state) => state.cartItems.length > 0;
const selectQtyById = (id) => (state) => {
  const item = state.cartItems.find((p) => p.id === id);
  return item ? item.quantity : 0;
};

// derived cart selectors

const selectTotalQuantity = (state) =>
  state.cartItems.reduce((acc, current) => acc + current.quantity, 0);

const selectTotalPrice = (state) =>
  state.cartItems.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0,
  );

//  UI selectors
const selectIsCartOpen = (state) => state.isCartOpen;
const selectTheme = (state) => state.theme;
