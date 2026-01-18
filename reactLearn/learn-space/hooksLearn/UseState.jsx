import React, { useState } from "react";

const productsList = [
  { id: 1, name: "Smartphone", price: 699 },
  { id: 2, name: "Laptop", price: 1200 },
  { id: 3, name: "Wireless Earbuds", price: 150 },
  { id: 4, name: "Smartwatch", price: 250 },
  { id: 5, name: "Tablet", price: 500 },
];

const App = () => {
  const [products] = useState(() => productsList);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const check = prev.find((i) => i.id === item.id);
      const newList = check
        ? prev.map((p) =>
            p.id === item.id ? { ...p, count: p.count + 1 } : p,
          )
        : [...prev, { ...item, count: 1 }];
      return newList;
    });
  };
  const removeFromCart = (item) => {
    setCart((prev) => prev.filter((p) => item.id !== p.id));
  };
  const filtered = products.filter((p) =>
    p.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
  );
  const changeQty = (e, item) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === item.id
            ? { ...p, count: Number(e.target.value) }
            : p,
        )
        .filter((p) => p.count > 0),
    );
  };

  return (
    <div className="useState">
      <h1>useState practice</h1>
      <input
        type="text"
        name="search"
        placeholder="search ..."
        onChange={handleChange}
      />
      <h3>
        our products ({filtered.length}) filter:{" "}
        {filter ? filter : "all"}
      </h3>
      <ul>
        {filtered.map((f) => (
          <li key={f.id} style={{ margin: "0 0 1rem 0" }}>
            <p style={{ display: "inline" }}>
              {f.name} - {f.price}$
            </p>
            <button
              style={{ margin: "0 0 0 1rem" }}
              onClick={() => {
                addToCart(f);
              }}
            >
              add to cart
            </button>
          </li>
        ))}
      </ul>
      <h3>cart ({cart.length}) </h3>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            <p style={{ display: "inline" }}>{item.name}</p>
            <input
              style={{ margin: "0 1rem" }}
              type="number"
              placeholder="qty"
              value={item.count}
              onChange={(e) => changeQty(e, item)}
            />
            <button
              onClick={() => {
                removeFromCart(item);
              }}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
