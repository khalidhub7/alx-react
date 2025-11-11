// NOTE: This file is for learning and revision only; not meant to run

// Basic state → hold a single value
const [count, setCount] = useState(0);

// Object state → store multiple related values together
const [user, setUser] = useState({ name: "", email: "" });

// Array state → manage lists like cart or items
const [cart, setCart] = useState([]);

// Lazy initial state → compute initial value once
const [products, setProducts] = useState(() => fetchInitial());

// Functional updates → update state based on previous state
setCount(prev => prev + 1);

// Derived state with useEffect → avoid storing redundant values
useEffect(() => setTotal(calc(cart)), [cart]);

// Split complex state → separate concerns instead of one big object
const [cart, setCart] = useState([]);
const [user, setUser] = useState({});

// Reset state → provide a clear reset function
const resetCart = () => setCart([]);

// State with side effects → trigger effects after state changes
useEffect(() => saveCart(cart), [cart]);