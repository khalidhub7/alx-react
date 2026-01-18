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

// call 'set' inside helper breaks zustand design principle
// so the reducer should take 'state' instead of 'set'

const addItemReducer = (item, state) => {
  // in real apps, ensure to return the same state same ref if no changes
  const isExist = state.cartItems.find((i) => i.id === item.id);
  const cartItems = isExist
    ? state.cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      )
    : [...state.cartItems, { ...item, quantity: 1 }];
  return { cartItems };
};
const removeItemReducer = (id, state) => {
  // in real apps, ensure to return the same state same ref if no changes
  const cartItems = state.cartItems.filter((item) => item.id !== id);
  return { cartItems };
};

const clearCartReducer = () => ({ cartItems: [] });

const addWishlistItem = (item, state) => {
  const isExist = state.wishList.find((i) => i.id === item.id);

  const wishList = isExist
    ? state.wishList.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
      )
    : [...state.wishList, { ...item, quantity: 1 }];

  return { wishList };
};

const removeWishlistItem = (id, state) => {
  const wishList = state.wishList.filter((item) => item.id !== id);
  return { wishList };
};

const clearWishlist = () => ({ wishList: [] });

export { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart };
export { addItemReducer, removeItemReducer, clearCartReducer };
export { addWishlistItem, removeWishlistItem, clearWishlist };
