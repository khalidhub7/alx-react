// NOTE: revision file — simple and complete

// 1) Basic reducer
const [count, dispatch] = useReducer((state, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;
    default:
      return state;
  }
}, 0);

// 2) Object state
const [user, userDispatch] = useReducer(
  (state, action) => {
    switch (action.type) {
      case "SET_NAME":
        return { ...state, name: action.payload };
      default:
        return state;
    }
  },
  { name: "" },
);

// 3) Array state (cart)
const [cart, cartDispatch] = useReducer((state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.item];
    case "REMOVE":
      return state.filter((i) => i.id !== action.id);
    default:
      return state;
  }
}, []);

// 4) Lazy init
const init = () => JSON.parse(localStorage.getItem("cart")) || [];
const [products, pDispatch] = useReducer((s) => s, [], init);

// 5) Functional updates handled in reducer
const [qty, qtyDispatch] = useReducer((s, a) => {
  if (a.type === "INC") return s + 1;
  if (a.type === "DEC") return s - 1;
  return s;
}, 0);

// 6) Derived values computed outside
useEffect(() => {
  const total = cart.reduce((a, c) => a + c.price * c.qty, 0);
}, [cart]);

// 7) Split complex state
const [cartState] = useReducer(cartReducer, []);
const [userState] = useReducer(userReducer, {});

// 8) Reset state
dispatch({ type: "RESET" });

// 9) Side effects after dispatch
useEffect(
  () => localStorage.setItem("cart", JSON.stringify(cart)),
  [cart],
);
