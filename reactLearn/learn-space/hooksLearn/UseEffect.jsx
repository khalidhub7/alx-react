import React, { useState, useEffect, useRef } from "react";

const mockProducts = [
  { id: 1, name: "Phone", price: 800 },
  { id: 2, name: "Laptop", price: 1500 },
  { id: 3, name: "Headphones", price: 199 },
  { id: 4, name: "Keyboard", price: 120 },
  { id: 5, name: "Tablet", price: 600 },
];

const App = () => {
  // state
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [cart, setCart] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);
  const [banner, setBanner] = useState("🔹 welcome to myShop");
  const [scrollY, setScrollY] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  const [status, setStatus] = useState("");

  const firstRender = useRef(true);

  // mount: load products (mock fetch)
  useEffect(() => {
    setStatus("⏳ loading...");
    setTimeout(() => {
      /* console.log("now fetched"); */
      setProducts(mockProducts);
      setStatus("");
    }, 1000);
  }, []);

  // filter logic
  useEffect(() => {
    if (filter === "all") {
      return;
    }
    setStatus(`filtering by "${filter}" 🔍`);
    const id = setTimeout(() => {
      /* console.log(`now filtered`); */
      setStatus("");
    }, 1000);
    return () => clearTimeout(id);
  }, [filter]);

  // sync cart to localstorage
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // on mount → restore cart
  useEffect(() => {
    const getCart = localStorage.getItem("cart");
    if (getCart) setCart(JSON.parse(getCart));
  }, []);

  // derived logic: subtotal, tax, total
  useEffect(() => {
    setSubtotal(
      cart.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }, [cart]);

  // side effect: update document title
  useEffect(() => {
    document.title = `MyShop (${cart.length} items)`;
  }, [cart]);

  // interval: banner rotation
  useEffect(() => {
    const id = setInterval(() => {
      setBanner((prev) =>
        prev === "🔹 welcome to myShop"
          ? "🔹 big deals today!"
          : "🔹 welcome to myShop",
      );
    }, 5000);

    return () => clearInterval(id);
  }, []);

  // scroll listener
  useEffect(() => {
    const scrollYSetter = () => {
      setScrollY(window.scrollY);
      /* console.log(window.scrollY) */
    };
    window.addEventListener("scroll", scrollYSetter);

    return () => window.removeEventListener("scroll", scrollYSetter);
  }, []);

  // guarded effect: fetch product details
  useEffect(() => {
    if (!selectedId) return;
    let ignore = false;
    setTimeout(() => {
      if (!ignore) {
        setDetails(products.find((i) => i.id === selectedId));
      }
    }, 300);
    return () => {
      ignore = true;
    };
  }, [selectedId]);

  // re active effect: filter products
  const filtered = products.filter((p) =>
    filter === "all"
      ? true
      : p.name.toLowerCase().includes(filter.toLowerCase()),
  );

  // actions
  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      return exists
        ? prev.map((p) =>
            p.id === item.id ? { ...p, qty: p.qty + 1 } : p,
          )
        : [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCart((prev) => prev.filter((p) => item.id !== p.id));
  };

  // ui
  return (
    <div className="useEffect" style={{ padding: "2rem" }}>
      <h1>useEffect practice</h1>
      <h3>{banner}</h3>

      <input
        type="text"
        placeholder="search..."
        onChange={(e) => setFilter(e.target.value)}
      />

      <h3>
        products ({filtered.length}) {filter}
      </h3>

      <ul>
        {status ? (
          <p>{status}</p>
        ) : (
          filtered.map((p) => (
            <li key={p.id}>
              <span className="product-text">
                {p.name} - ${p.price}
              </span>
              <div className="button-group">
                <button onClick={() => addToCart(p)}>add</button>
                <button onClick={() => setSelectedId(p.id)}>
                  details
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <h3>cart ({cart.length})</h3>
      <p>subtotal: ${subtotal}</p>

      <ul>
        {cart.map((c) => (
          <li key={c.id}>
            {c.name} x {c.qty}
            <button onClick={() => removeFromCart(c)}>remove</button>
          </li>
        ))}
      </ul>

      {scrollY > 300 ? (
        <button
          type="button"
          style={{ position: "fixed", bottom: 20, right: 20 }}
          onClick={() => window.scrollTo(0, 0)}
        >
          back to top
        </button>
      ) : undefined}

      {details ? (
        <div
          style={{
            padding: "1rem",
            border: "1px solid #3b82f6",
            borderRadius: "10px",
          }}
        >
          <h3>Product Details</h3>
          <pre>{JSON.stringify(details, null, 2)}</pre>
          <button type="button" onClick={() => setDetails(null)}>
            close
          </button>
        </div>
      ) : undefined}
    </div>
  );
};

export default App;
