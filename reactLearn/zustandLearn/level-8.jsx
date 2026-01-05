// ZUSTAND MASTERY — LEVEL 8 PRACTICE
// use only Level 8 learned concepts (architecture & design)
/*
ZUSTAND — architecture design patterns:

- feature-based store design
- UI state vs server state separation
- minimal global app state
- derived state (do NOT store computed values)
- store independence (no cross-store mutations)
- app state vs feature state
- component-level orchestration
- scalable, real-world eCommerce architecture
*/

import { create } from "zustand";
import { addItemReducer, clearCartReducer, removeItemReducer } from "./helpers";

import { addWishlistItem, clearWishlist, removeWishlistItem } from "./helpers";
import { useEffect } from "react";

// with zustand better to define global state in separated stores
// global store
const useAppStore = create((set, get) => ({
  // state
  theme: "light",
  language: "en-us",
  authSession: {},

  // actions
  toggleTheme: () =>
    set((s) => (s.theme === "light" ? { theme: "dark" } : { theme: "light" })),
  changeLang: (lang) => set({ language: lang }),
  setSession: (obj) => set({ authSession: obj }),
}));

// auth store

const initialAuth = { user: null, token: null };

const useAuthStore = create((set, get) => ({
  ...initialAuth,
  // action
  login: (user, token) => set({ user, token }),
  logout: () => set(initialAuth),
}));

// cart store

const useCartStore = create((set, get) => ({
  // state
  cartItems: [],
  // actions
  addItem: (item) => set((s) => addItemReducer(item, s)),
  removeItem: (id) => set((s) => removeItemReducer(id, s)),
  clearCart: () => set(clearCartReducer()),
}));

// whishlist store

// wishlist store must be completely independent from cart & auth

const useWishlistStore = create((set, get) => ({
  // state
  wishList: [],

  // actions
  addItem: (item) => set((s) => addWishlistItem(item, s)),
  removeItem: (id) => set((s) => removeWishlistItem(id, s)),
  clearCart: () => set(clearWishlist()),
}));

// ui orchestration (Component Layer)
// NOTE:
// components orchestrate behavior
// stores NEVER talk to each other directly

const CheckoutPage = () => {
  const authSession = useAuthStore((s) => s.authSession);
  const cartItems = useCartStore((s) => s.cartItems);
  const totalPrice = useCartStore((s) =>
    s.cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0),
  );

  // after checkout success should clear cart
  useEffect(() => {
    const t = setTimeout(() => {
      console.log("checkout success");

      useCartStore((s) => s.clearCart);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // if user logs out the auth store should reset
  useEffect(() => {
    const t = setTimeout(() => {
      console.log("user logsout success");
      useAuthStore((s) => s.logout);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  return <div></div>;
};

const Header = () => {
  const theme = useAppStore((s) => s.theme);
  const session = useAppStore((s) => s.authSession);
  const isAuthenticated = Object.keys(session).length > 0;

  return (
    <div>welcome {isAuthenticated ? `${session.user.name}` : "Guest"}</div>
  );
};

// server state
/*
data that come from server like products List should stored in react query
not in zustand 
zustand:      ui state
react query:  server state
*/

/*
derived states should not stored in zustand store
store should NOT fetch profile data bcs its a server state
stores must not import each other to achieve comp orchestration pattern
if we remove the cart feature (both should removed cart store and cart comp)
this task is apply ui state pattern
*/
