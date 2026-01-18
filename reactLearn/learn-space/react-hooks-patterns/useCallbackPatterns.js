// NOTE: revision file — simple and complete

// 1) Memoize function
const addToCart = useCallback(
  (p) => setCart((prev) => [...prev, p]),
  [],
);

// 2) With dependencies
const setFilterValue = useCallback((v) => setFilter(v), [filter]);

// 3) Prevent child re-renders
const handleClick = useCallback((id) => {
  console.log(id);
}, []);

// 4) Functional update (keeps deps empty)
const increment = useCallback(() => setCount((prev) => prev + 1), []);

// 5) Cleanup inside callback (rare)
const subscribe = useCallback(() => {
  const id = startSubscription();
  return () => stopSubscription(id);
}, []);

// 6) Stable handler for child components
const removeFromCart = useCallback(
  (id) => setCart((prev) => prev.filter((p) => p.id !== id)),
  [],
);
