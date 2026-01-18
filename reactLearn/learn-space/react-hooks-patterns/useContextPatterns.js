// NOTE: revision file — simple and complete

// 1) Create context
const CartContext = createContext();

// 2) Provider wraps state + actions
<CartContext.Provider value={{ cart, addItem }} />;

// 3) Access via custom hook
const useCart = () => useContext(CartContext);

// 4) Use reducer for complex logic
const [state, dispatch] = useReducer(reducer, initial);

// 5) Memoize context value to avoid re-renders
const value = useMemo(() => ({ cart }), [cart]);

// 6) Persist context changes (sync external)
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

// 7) Restore context on mount
useEffect(() => {
  dispatch({ type: "load", payload: loadFromStorage() });
}, []);

// 8) Avoid context for large / rapidly changing data
useQuery(["products"], fetchProducts); // better than context
