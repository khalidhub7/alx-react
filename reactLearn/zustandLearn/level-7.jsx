// ZUSTAND MASTERY — LEVEL 7 PRACTICE
// use only Level 7 learned concepts (performance & optimization)
/*
ZUSTAND — performance design patterns:

- selector-first pattern
- derived state (do NOT store computed values)
- split stores by responsibility
- avoid full-store subscriptions
- shallow comparison ONLY when needed
- update-guard pattern
- no UI-only / temporary state in global store
- minimal, flat, performance-friendly state
- scalable, production-ready eCommerce design
*/

import { create } from "zustand";
import { shallow } from "zustand/shallow";
import { addItemReducer, removeItemReducer } from "./helpers";

// hints
// reducers must return same state if no change

const initialState = { user: null, token: null };
// auth store
const useAuthStore = create((set, get) => ({
  // state
  ...initialState,

  // actions
  login: (user, token) =>
    set((s) => (s.user === user && s.token === token ? s : { user, token })),
  logout: () => set(initialState),
}));

// cart store
const useCartStore = create((set, get) => ({
  cartItems: [],

  addItem: (item) => set((s) => addItemReducer(item, s)),
  removeItem: (id) => set((s) => removeItemReducer(id, s)),
}));

// selectors

const AuthLayout = () => {
  const isAuthenticated = useAuthStore((s) => Boolean(s.token));
  const user = useAuthStore((s) => s.user, shallow);
  return (
    <p>
      Status: {isAuthenticated ? "Authenticated" : "Guest"} | User:{" "}
      {user?.name ?? "None"}
    </p>
  );
};

const CartLayout = () => {
  const itemsCount = useCartStore((s) =>
    s.cartItems.reduce((acc, current) => acc + current.quantity, 0),
  );

  const totalPrice = useCartStore((s) =>
    s.cartItems.reduce(
      (acc, current) => acc + current.quantity * current.price,
      0,
    ),
  );

  const cartItems = useCartStore((s) => s.cartItems, shallow);

  return (
    <p>
      Items: {itemsCount} | Total: ${totalPrice.toFixed(2)}
    </p>
  );
};
