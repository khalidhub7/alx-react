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
const _ = { id: "1", title: "socks", price: 29, quantity: 2 };

const useCartStore = create((set, get) => ({
  // state
  cartItems: [],

  totalQuantity: () =>
    get().cartItems.reduce((acc, item) => acc + item.quantity, 0),

  totalPrice: () =>
    get().cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0),

  // actions
  addItem: (item) =>
    set((state) => {
      const isExist = state.cartItems.find((i) => i.id === item.id);
      const cartItems = isExist
        ? state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...state.cartItems, { ...item, quantity: 1 }];
      return { cartItems };
    }),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  increaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    })),

  decreaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    })),

  clearCart: () => set({ cartItems: [] }),
}));

export default useCartStore;
