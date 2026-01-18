// NOTE: revision file — simple and complete

// 1) Basic state
const [count, setCount] = useState(0);

// 2) Object state
const [user, setUser] = useState({ name: "", email: "" });

// 3) Array state
const [cart, setCart] = useState([]);

// 4) Lazy initial state (runs once)
const [products] = useState(() => fetchInitial());

// 5) Functional updates (safe when based on prev)
setCount((prev) => prev + 1);

// 6) Derived state inside effects (don’t store computed values)
useEffect(() => setTotal(calc(cart)), [cart]);

// 7) Split unrelated state
const [cartList, setCartList] = useState([]);
const [profile, setProfile] = useState({});

// 8) Reset state
const resetCart = () => setCart([]);

// 9) Persist / sync with external systems
useEffect(() => saveCart(cart), [cart]);
