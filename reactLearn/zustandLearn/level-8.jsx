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
import { addWishlistItem, clearWishlist, removeWishlistItem } from "./helpers";
import { addItemReducer, clearCartReducer, removeItemReducer } from "./helpers";

// with zustand better to define global state in separated stores
// global store
const useAppStore = create((set, get) => ({
  // state
  theme: "light",
  language: "en-us",

  // actions
  toggleTheme: () =>
    set((s) => (s.theme === "light" ? { theme: "dark" } : { theme: "light" })),
  changeLang: (lang) => set({ language: lang }),
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
  addWishlistItem: (item) => set((s) => addWishlistItem(item, s)),
  removeWishlistItem: (id) => set((s) => removeWishlistItem(id, s)),
  clearWishlist: () => set(clearWishlist()),
}));

// ui orchestration (Component Layer)
// NOTE:
// components orchestrate behavior
// stores NEVER talk to each other directly

const CheckoutPage = () => {
  const isAuthenticated = useAuthStore((s) => Boolean(s.token));
  const cartItems = useCartStore((s) => s.cartItems);
  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.quantity * cur.price,
    0,
  );
  const clearCart = useCartStore((s) => s.clearCart);
  const logoutAction = useAuthStore((s) => s.logout);

  // after checkout success should clear cart
  const checkoutHandler = () => {
    console.log("checkout success");
    clearCart();
  };

  // if user logs out the auth store should reset
  const logoutHandler = () => {
    console.log("user logsout success");
    logoutAction();
  };

  return (
    <div>
      <div>
        <p>{isAuthenticated ? "Logged in" : "Not logged in"}</p>
        <p>
          cartItems: {cartItems} totalPrice: {totalPrice}
        </p>
        <button onClick={checkoutHandler}>Pay Now</button>
      </div>
      <button onClick={logoutHandler}></button>
    </div>
  );
};

const Header = () => {
  const theme = useAppStore((s) => s.theme);
  const isAuthenticated = useAuthStore((s) => Boolean(s.token));

  return <div>welcome {isAuthenticated ? "Logged in" : "Not logged in"}</div>;
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

// Derived state rule:
// - UI-only or one-off → compute inside the component
// - Global/shared domain logic (auth, permissions, totals)
//   → expose as selector/getter in the store
// - Never store duplicated derived values
