// NOTE: revision file — simple and complete

// 1) Memoize computed value
const filtered = useMemo(
  () => products.filter((p) => p.category === filter),
  [filter],
);

// 2) Expensive computation
const totalPrice = useMemo(
  () => filtered.reduce((sum, p) => sum + p.price, 0),
  [filtered],
);

// 3) Memoize objects to avoid re-renders
const cartSummary = useMemo(
  () => ({ total: totalPrice, count: filtered.length }),
  [totalPrice, filtered],
);

// 4) Combine useMemo + useCallback
const handleAdd = useCallback(
  (p) => setCart((prev) => [...prev, p]),
  [],
);

// 5) Memoize initial values for useState
const initialCart = useMemo(() => fetchInitialCart(), []);
const [cart, setCart] = useState(initialCart);

// 6) Separate unrelated memoized values
const electronics = useMemo(
  () => products.filter((p) => p.category === "electronics"),
  [products],
);
const fashion = useMemo(
  () => products.filter((p) => p.category === "fashion"),
  [products],
);

// 7) Memoized JSX (expensive render lists)
const itemsJsx = useMemo(
  () => sorted.map((i) => <Item key={i.id} {...i} />),
  [sorted],
);
