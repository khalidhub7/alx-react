import React, { useReducer } from "react";

// initial state
const initialState = {
  cart: [], // array of items: {id, title, price, qty}
  total: 0,
};

const actions = {
  ADD_ITEM: "add_item",
  REMOVE_ITEM: "remove_item",
  INCREMENT_QTY: "inc_qty",
  DECREMENT_QTY: "dec_qty",
  CLEAR_CART: "clear_cart",
};

const calculateTotal = (cart) =>
  cart.reduce((acc, current) => acc + current.price * current.qty, 0);

const cartHandlers = {
  add_item: (state, data) => {
    const check = state.cart.find((p) => p.id === data.product.id);

    const newCart = check
      ? state.cart.map((p) =>
          p.id === data.product.id ? { ...p, qty: p.qty + 1 } : p,
        )
      : [...state.cart, { ...data.product, qty: 1 }];

    return { cart: newCart, total: calculateTotal(newCart) };
  },

  remove_item: (state, data) => {
    const newCart = state.cart.filter((p) => p.id !== data.id);
    return { cart: newCart, total: calculateTotal(newCart) };
  },

  inc_qty: (state, data) => {
    const check = state.cart.find((i) => i.id === data.id);
    if (!check) return state;

    const newCart = state.cart.map((p) =>
      p.id === data.id ? { ...p, qty: p.qty + 1 } : p,
    );

    return { cart: newCart, total: calculateTotal(newCart) };
  },

  dec_qty: (state, data) => {
    const check = state.cart.find((i) => i.id === data.id);
    if (!check || check.qty <= 1) return state;

    const newCart = state.cart.map((p) =>
      p.id === data.id ? { ...p, qty: p.qty - 1 } : p,
    );

    return { cart: newCart, total: calculateTotal(newCart) };
  },

  clear_cart: () => ({ cart: [], total: 0 }),
};

const cartReducer = (state, data) => {
  const handler = cartHandlers[data.type];
  return handler ? handler(state, data) : state;
};

// App Component
const App = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // dummy products
  const products = [
    { id: 1, title: "Keyboard", price: 50 },
    { id: 2, title: "Mouse", price: 20 },
    { id: 3, title: "Monitor", price: 200 },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>useReducer practice</h1>
      <h2>products</h2>
      {products.map((product) => (
        <div key={product.id} style={{ lineHeight: 2 }}>
          <span>
            {product.title} - ${product.price}
          </span>
          <button
            style={{ marginLeft: 10 }}
            onClick={() =>
              dispatch({ type: actions.ADD_ITEM, product })
            }
          >
            add to cart
          </button>
        </div>
      ))}

      <hr />
      <h2>your cart</h2>
      {state.cart.length === 0 ? <p>cart is empty</p> : undefined}
      {state.cart.map((item) => (
        <div key={item.id} style={{ marginBottom: 10 }}>
          <strong>{item.title}</strong> — ${item.price}
          &nbsp; x {item.qty}
          <button
            style={{ marginLeft: 10 }}
            onClick={() =>
              dispatch({ type: actions.INCREMENT_QTY, id: item.id })
            }
          >
            inc
          </button>
          <button
            style={{ marginLeft: 10 }}
            onClick={() =>
              dispatch({ type: actions.DECREMENT_QTY, id: item.id })
            }
          >
            dec
          </button>
          <button
            style={{ marginLeft: 10 }}
            onClick={() =>
              dispatch({ type: actions.REMOVE_ITEM, id: item.id })
            }
          >
            remove
          </button>
        </div>
      ))}

      <hr />
      <h2>total: ${state.total}</h2>

      <button onClick={() => dispatch({ type: actions.CLEAR_CART })}>
        clear cart
      </button>
    </div>
  );
};

export default App;
