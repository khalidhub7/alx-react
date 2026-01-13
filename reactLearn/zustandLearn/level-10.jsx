// ZUSTAND MASTERY — LEVEL 10 PRACTICE
// use only Level 10 learned concepts (advanced architecture)

/*
ZUSTAND — pro architecture design patterns:

- feature-based store design
- store composition (slices)
- store reset pattern
- persist + devtools middleware
- hydration awareness
- no cross-store mutations
- ui state only (no server state)
- derived state NOT stored
- component-level orchestration
- scalable real-world eCommerce architecture
*/
import React from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const initialAppState = { theme: "light", language: "en" };

// app store (global store)
const useAppStore = create(
  devtools(
    // first param of devtools (store def)
    persist(
      // first param or persist (store def)
      (set, get) => ({
        // state
        // ...initialAppState, (migrated)
        // new migrated state shape
        ...{ ...initialAppState, currency: "USD" },

        // actions
        toggleTheme: () =>
          set((s) => ({
            theme: s.theme === "light" ? "dark" : "light",
          })),

        changeLanguage: (lang) => set({ language: lang }),
        resetAppStore: () => set(initialAppState, true),
      }),
      // second param or persist (options)
      {
        name: "app-storage",
        // version + migrate pattern
        version: 2,
        migrate: (s, v) => (v === 2 ? { ...s, currency: "USD" } : s),
      },
    ),
    // second param of devtools (options)
    {},
  ),
);

// auth store

const initialAuthState = { user: null, token: null, hydrated: false };

const useAuthStore = create(
  devtools(
    // devtools first param
    persist(
      // persist first param
      (set, get) => ({
        // state
        ...initialAuthState,
        // actions
        login: (user, token) => set({ user, token }),
        logout: () => set(initialAuthState),
        // hydration flag
        setHydrated: () => set({ hydrated: true }),
        resetAuthStore: () => set(initialAuthState, true),
      }),
      // persist second param
      {
        name: "auth-storage",
        onRehydrateStorage: () => (state) => {
          state?.setHydrated();
        },
      },
    ),
    // devtools second param
    {},
  ),
);

// cart store

const initialCartState = { cartItems: [] };

const useCartStore = create(
  devtools(
    // devtools first param
    persist(
      // persist first param
      (set, get) => ({
        ...initialCartState,

        addItem: (item) =>
          set((s) => ({
            cartItems: [...s.cartItems, item],
          })),

        removeItem: (id) =>
          set((s) => ({
            cartItems: s.cartItems.filter((i) => i.id !== id),
          })),

        clearCart: () => set(initialCartState),
        resetCartStore: () => set(initialCartState, true),
      }),
      // persist second param
      {
        name: "cart-storage",
      },
    ),
    // devtools second param
    {},
  ),
);

// wishlist store

const initialWishlistState = { wishlist: [] };

const useWishlistStore = create(
  devtools(
    // devtools first param
    persist(
      // persist first param
      (set, get) => ({
        ...initialWishlistState,

        addWishlist: (item) =>
          set((s) => ({ wishlist: [...s.wishlist, item] })),

        removeWishlist: (id) =>
          set((s) => ({
            wishlist: s.wishlist.filter((i) => i.id !== id),
          })),

        clearWishlist: () => set(initialWishlistState),
        resetWishlistStore: () => set(initialWishlistState, true),
      }),
      // persist second param
      {
        name: "wishlist-storage",
      },
    ),
    // devtools second param
    {},
  ),
);

// component orchestration layer

const CheckoutPage = () => {
  const cartItems = useCartStore((s) => s.cartItems);
  const clearCart = useCartStore((s) => s.clearCart);

  const logout = useAuthStore((s) => s.logout);

  const totalPrice = cartItems.reduce(
    (acc, cur) => acc + cur.price * cur.qty,
    0,
  );

  const checkoutHandler = () => {
    console.log("checkout success");
    clearCart();
  };

  const logoutHandler = () => {
    console.log("logout success");
    logout();
  };

  return (
    <div>
      <p>Total: {totalPrice}</p>
      <button onClick={checkoutHandler}>checkout</button>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

// hydration aware ui

const Header = () => {
  // states
  const hydrated = useAuthStore((s) => s.hydrated);
  const user = useAuthStore((s) => s.user);
  const lang = useAppStore((s) => s.language);
  const theme = useAppStore((s) => s.theme);
  // actions
  const toggleTheme = useAppStore((s) => s.toggleTheme);

  if (!hydrated) return <p>loading auth...</p>;

  return (
    <div style={{ display: "flex", justifyContent: "space-around" }}>
      <p>{user ? "logged in" : "guest"}</p>
      <p>language: {lang}</p>
      <button onClick={toggleTheme}>{theme}</button>
    </div>
  );
};

const App = () => (
  <>
    <Header />
    <CheckoutPage />
  </>
);

export default App;

/*
TODO 1:
- Implement all resetStore functions correctly using initial state.
done

TODO 2:
- Explain (in comments) why reset is better than clear mutations.
// Reset replaces the whole state in one step, avoiding partial bugs.

TODO 3:
- Explain why hydration flag is important.
// Prevents UI from using default state before persisted state loads.

TODO 4:
- Explain why totalPrice is NOT in store.
// derived state should not be stored bcs it can be out of sync

TODO 5:
- Explain why CheckoutPage orchestrates logic.
// components orchestrate actions between stores without coupling 
// stores together

TODO 6:
- Explain why stores never import each other.
// stores must be isolated from each others

TODO 7:
Write one example of accessing store outside React:
useCartStore.getState().clearCart()
Explain when this is useful.

// Useful in API services, tests, logout helpers, and WebSocket handlers.
*/
