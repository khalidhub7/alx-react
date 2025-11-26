// NOTE: revision file — simple and complete

// 1) Run on mount (fetch, setup)
useEffect(() => init(), []);

// 2) Run when dependencies change
useEffect(() => updateTotal(), [cart]);

// 3) Sync with external systems
useEffect(() => localStorage.setItem("cart", cart), [cart]);

// 4) Cleanup side effects
useEffect(() => {
  start();
  return stop;
}, []);

// 5) Guarded effects
useEffect(() => {
  if (!user) return;
  fetchData();
}, [user]);

// 6) Separate unrelated logic
useEffect(logCart, [cart]);
useEffect(logUser, [user]);

// 7) Derived state
useEffect(() => setTotal(calc(cart)), [cart]);

// 8) Cancel async work (avoid race conditions)
useEffect(() => {
  let active = true;
  fetch().then((r) => active && set(r));
  return () => {
    active = false;
  };
}, []);

// 9) Event listeners
useEffect(() => {
  const onScroll = () => console.log(window.scrollY);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);
