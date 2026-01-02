import isEqual from "lodash/isEqual";

// two args: item, setter
const addItem = (item, set) =>
  set((state) => {
    const isExist = state.cartItems.find((i) => i.id === item.id);
    const cartItems = isExist
      ? state.cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      : [...state.cartItems, { ...item, quantity: 1 }];
    return { cartItems };
  });

const removeItem = (id, set) =>
  set((state) => {
    const cartItems = state.cartItems.filter((item) => item.id !== id);
    return { cartItems };
  });

const increaseQuantity = (id, set) =>
  set((state) => {
    const cartItems = state.cartItems.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
    );
    return { cartItems };
  });

const decreaseQuantity = (id, set) =>
  set((state) => {
    const cartItems = state.cartItems
      .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
      .filter((i) => i.quantity > 0);
    return { cartItems };
  });

const clearCart = (set) => set(() => ({ cartItems: [] }));

// call 'set' inside helper breaks a key Zustand design principle
// so 'state' instead of 'set'
// if nothing changes → return same state + same reference

const addItemReducer = (item, state) => {
  const isExist = state.cartItems.find((i) => i.id === item.id);
  const cartItems = isExist
    ? state.cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      )
    : [...state.cartItems, { ...item, quantity: 1 }];

  return isEqual(state.cartItems, cartItems) ? state : { cartItems };
};
const removeItemReducer = (id, state) => {
  const cartItems = state.cartItems.filter((item) => item.id !== id);
  return isEqual(state.cartItems, cartItems) ? state : { cartItems };
};

export { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart };
export { addItemReducer, removeItemReducer };
