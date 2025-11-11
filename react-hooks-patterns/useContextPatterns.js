// NOTE: This file is for learning and revision only; not meant to run

// Use context to share data across many components without props
const MyContext = createContext();

// Keep each context focused on one job (cart, auth, theme…)
const CartContext = createContext();

// Provider contains the state and the functions that update it
<CartContext.Provider value={{ cart, addItem }}>

// Access context through custom hooks for cleaner architecture
const useCart = () => useContext(CartContext);

// Use reducers when state logic becomes more complex
const [state, dispatch] = useReducer(reducer, initial);

// Memoize the context value to avoid unnecessary re-renders
const value = useMemo(() => ({ cart }), [cart]);

// Don’t use context for large or fast-changing data
useQuery(["products"], fetchProducts); // instead of context
