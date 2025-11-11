// NOTE: This file is for learning and revision only; not meant to run

// Run code once on component mount (setup, fetch, init)
useEffect(() => init(), []);

// Run code when specific state/props change
useEffect(() => updateTotal(), [cart]);

// Sync React state with external systems (localStorage, URL, theme)
useEffect(() => localStorage.setItem("cart", cart), [cart]);

// Cleanup side effects (unsubscribe, stop timers, remove listeners)
useEffect(() => { start(); return stop; }, []);

// Avoid running when value is unchanged by checking inside the effect
useEffect(() => { if (!user) return; fetchData(); }, [user]);

// Separate unrelated logic into separate useEffects
useEffect(logCart, [cart]);
useEffect(logUser, [user]);

// Use effect to derive state only when necessary (avoid infinite loops)
useEffect(() => setTotal(calc(cart)), [cart]);

// Cleanup previous async requests to avoid race conditions
useEffect(() => { 
  let active = true; 
  fetch().then(r => active && set(r)); 
}, []);