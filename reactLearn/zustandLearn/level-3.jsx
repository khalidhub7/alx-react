// ZUSTAND MASTERY — LEVEL 3 PRACTICE
// use only Level 3 learned concepts
/*
advanced selector design patterns:
- single-value selectors (smallest subscription)
- action-only selectors (no re-renders)
- derived selectors (no duplicated state)
- boolean selectors for UI logic
- selector reuse & consistency
- avoid object/array selector traps
- performance-first subscription mindset
- components subscribe to minimal truth
*/

import { create } from "zustand";
import {
  addItem,
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "./helpers";

// cart item shape
// const _ = { id: "1", title: "socks", price: 29, quantity: 2 };

const useCartStore = create((set, get) => ({
  // state
  cartItems: [],

  // actions
  addItem: (product) => addItem(product, set),
  removeItem: (id) => removeItem(id, set),
  increaseQuantity: (id) => increaseQuantity(id, set),
  decreaseQuantity: (id) => decreaseQuantity(id, set),
}));

// selectors
const selectCartItems = (state) => state.cartItems;

// derived state
// dont store derived state inside the zustand store
const selectTotalQuantity = (state) =>
  state.cartItems.reduce((acc, current) => acc + current.quantity, 0);
const selectTotalPrice = (state) =>
  state.cartItems.reduce(
    (acc, current) => acc + current.price * current.quantity,
    0,
  );
const selectHasItems = (state) => state.cartItems.length > 0;

// actions selectors
const selectAddItem = (state) => state.addItem;
const selectRemoveItem = (state) => state.removeItem;

const selectQuantityById = (id) => (state) => {
  const item = state.cartItems.find((p) => p.id === id);
  return item ? item.quantity : 0;
};
