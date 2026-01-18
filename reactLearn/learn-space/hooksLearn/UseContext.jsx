import React, {
  createContext,
  useReducer,
  useContext,
  useRef,
  useEffect,
} from "react";

const cartReducer = (state, action) => {
  switch (action.type) {
    case "add":
      const existing = state.find((i) => i.id === action.payload.id);
      if (existing) {
        return state.map((p) =>
          p.id === action.payload.id
            ? { ...p, count: p.count + 1 }
            : p,
        );
      } else {
        return [...state, { ...action.payload, count: 1 }];
      }
    case "remove":
      return state.filter((i) => i.id !== action.payload);
    case "load":
      return action.payload;
    default:
      return state;
  }
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, []);
  const firstRender = useRef(true);
  /* console.log(firstRender) */

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      localStorage.setItem("cart", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    const oldCart = localStorage.getItem("cart");
    const payload = JSON.parse(oldCart || "[]");
    /* console.log(payload) */
    dispatch({ type: "load", payload });
  }, []);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

function ProductList() {
  const { state, dispatch } = useCart();
  const products = [
    { id: 1, name: "Keyboard", price: 120 },
    { id: 2, name: "Mouse", price: 40 },
    { id: 3, name: "Headset", price: 90 },
  ];

  return (
    <div>
      <h2>products</h2>
      {products.map((p) => (
        <div key={p.id}>
          {p.name} - ${p.price}
          <button
            onClick={() => dispatch({ type: "add", payload: p })}
          >
            add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const { state, dispatch } = useCart();

  return (
    <div>
      <h2>your cart</h2>
      {state.map((p) => (
        <div key={p.id}>
          <p>{p.name}</p>
          <button
            onClick={() =>
              dispatch({ type: "remove", payload: p.id })
            }
          >
            remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="useContext" style={{ padding: 20 }}>
        <h1>useContext practice</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}

export { CartContext, CartProvider };
