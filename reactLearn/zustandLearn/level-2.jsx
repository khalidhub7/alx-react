// ZUSTAND MASTERY — LEVEL 2 PRACTICE
// use only Level 2 learned concepts
/* 
core store design patterns:
- one feature store (cart)
- flat state only
- state vs actions separation
- actions own all logic
- feature-based design
- clear naming conventions
- use set / get correctly
*/

import { create } from "zustand";

// cart item shape
// const _ = { id: "1", title: "socks", price: 29, quantity: 2 };

const useCartStore = create((set, get) => ({
  // state
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,

  // actions
  addItem: (item) =>
    set((state) => {
      const isExist = state.cartItems.find((i) => i.id === item.id);
      const cartItems = isExist
        ? state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...state.cartItems, { ...item, quantity: 1 }];
      const totalPrice = state.totalPrice + item.price;
      const totalQuantity = state.totalQuantity + 1;
      return { cartItems, totalQuantity, totalPrice };
    }),

  removeItem: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id);
      const cartItems = state.cartItems.filter((item) => item.id !== id);
      const totalPrice = state.totalPrice - item.price * item.quantity;
      const totalQuantity = state.totalQuantity - item.quantity;
      return { cartItems, totalPrice, totalQuantity };
    }),

  increaseQuantity: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id);
      const cartItems = state.cartItems.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
      );
      const totalPrice = state.totalPrice + item.price;
      const totalQuantity = state.totalQuantity + 1;
      return { cartItems, totalPrice, totalQuantity };
    }),

  decreaseQuantity: (id) =>
    set((state) => {
      const item = state.cartItems.find((i) => i.id === id);
      const cartItems = state.cartItems
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
      const totalPrice = state.totalPrice - item.price;
      const totalQuantity = state.totalQuantity - 1;
      return { cartItems, totalPrice, totalQuantity };
    }),

  clearCart: () =>
    set(() => ({ cartItems: [], totalPrice: 0, totalQuantity: 0 })),
}));

export default useCartStore;
