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
import { addItem, removeItem, clearCart } from "./helpers";
import { increaseQuantity, decreaseQuantity } from "./helpers";

// cart item shape
// const _ = { id: "1", title: "socks", price: 29, quantity: 2 };

const useCartStore = create((set, get) => ({
  // state
  cartItems: [],
  totalQuantity: 0,
  totalPrice: 0,

  // actions
  addItem: (item) => addItem(item, set),
  removeItem: (id) => removeItem(id, set),
  increaseQuantity: (id) => increaseQuantity(id, set),
  decreaseQuantity: (id) => decreaseQuantity(id, set),
  clearCart: () => clearCart(set),
}));

export default useCartStore;
