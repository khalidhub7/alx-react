import React, { useState, useCallback, memo, useMemo } from "react";

// product item (memoized)
const ProductItem = memo(({ product, onAdd }) => {
  console.log("render: ProductItem →", product.name);

  return (
    <div style={{ lineHeight: 2 }}>
      <h4 style={{ display: "inline", marginLeft: 10 }}>
        {product.name}
      </h4>
      <p style={{ display: "inline", marginLeft: 10 }}>
        ${product.price}
      </p>
      <button
        style={{ display: "inline", marginLeft: 10, padding: 3 }}
        onClick={() => onAdd(product)}
      >
        add to cart
      </button>
    </div>
  );
});

// cart item (memoized)
const CartItem = memo(({ item, onRemove }) => {
  console.log("render: CartItem →", item.name);

  return (
    <div style={{ padding: 8, borderBottom: "1px solid #eee" }}>
      <p style={{ display: "inline" }}>
        {item.name} — ${item.price} — x{item.qty}
      </p>
      <button
        style={{ marginLeft: 10 }}
        onClick={() => onRemove(item.id)}
      >
        Remove
      </button>
    </div>
  );
});

// root Component
const App = () => {
  const [cart, setCart] = useState([]);

  const products = useMemo(
    () => [
      { id: 1, name: "Keyboard", price: 49 },
      { id: 2, name: "Mouse", price: 19 },
      { id: 3, name: "Headset", price: 89 },
    ],
    [],
  );

  const handleAddToCart = useCallback((product) => {
    setCart((prev) => {
      const check = prev.find((item) => item.id === product.id);

      return check
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item,
          )
        : [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const handleRemoveFromCart = useCallback(
    (id) => setCart((prev) => prev.filter((p) => p.id !== id)),
    [],
  );
  // its a func so should use callback
  const calculateTotal = useMemo(
    () =>
      cart.reduce(
        (acc, current) => acc + current.price * current.qty,
        0,
      ),
    [cart],
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>useCallback practice</h1>

      <h2>products</h2>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} onAdd={handleAddToCart} />
      ))}

      <h2>cart</h2>
      {cart.length === 0 ? <p>no items yet</p> : undefined}

      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onRemove={handleRemoveFromCart}
        />
      ))}

      <hr />
      <h2>total: ${calculateTotal}</h2>
    </div>
  );
};
export default App;
