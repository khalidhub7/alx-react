// two args: item, setter
const addItem = (item, set) =>
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
  });

const removeItem = (id, set) =>
  set((state) => {
    const item = state.cartItems.find((i) => i.id === id);
    const cartItems = state.cartItems.filter((item) => item.id !== id);
    const totalPrice = state.totalPrice - item.price * item.quantity;
    const totalQuantity = state.totalQuantity - item.quantity;
    return { cartItems, totalPrice, totalQuantity };
  });

const increaseQuantity = (id, set) =>
  set((state) => {
    const item = state.cartItems.find((i) => i.id === id);
    const cartItems = state.cartItems.map((i) =>
      i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
    );
    const totalPrice = state.totalPrice + item.price;
    const totalQuantity = state.totalQuantity + 1;
    return { cartItems, totalPrice, totalQuantity };
  });

const decreaseQuantity = (id, set) =>
  set((state) => {
    const item = state.cartItems.find((i) => i.id === id);
    const cartItems = state.cartItems
      .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
      .filter((i) => i.quantity > 0);
    const totalPrice = state.totalPrice - item.price;
    const totalQuantity = state.totalQuantity - 1;
    return { cartItems, totalPrice, totalQuantity };
  });

const clearCart = (set) =>
  set(() => ({ cartItems: [], totalPrice: 0, totalQuantity: 0 }));

export { addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart };
