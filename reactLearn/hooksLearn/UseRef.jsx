import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";

// ProductCard (child component)
const ProductCard = forwardRef(
  ({ product, onAdd, onRemove }, ref) => {
    const cardRef = useRef(null);

    const highlight = () => {
      cardRef.current.style.border = "2px solid red";
      setTimeout(() => {
        cardRef.current.style.border = "1px solid #ccc";
      }, 500);
    };
    // parent gives a basket (ref) to child
    // child puts potatoes (functions) in the basket using useImperativeHandle
    // now parent can take potatoes anytime and cook them
    // example: parent calls basket.current.highlight() → fries the potato
    useImperativeHandle(ref, () => ({ highlight }));
    return (
      <div
        ref={cardRef}
        style={{
          border: "1px solid #ccc",
          padding: 20,
          borderRadius: 5,
          marginBottom: 20,
        }}
      >
        <h3> {product.name} </h3>
        <button style={{ padding: 10 }} onClick={onAdd}>
          add to cart
        </button>
        <button
          style={{ padding: 10, marginLeft: 20 }}
          onClick={onRemove}
        >
          remove from cart
        </button>
      </div>
    );
  },
);

// App (parent component)
export default function App() {
  const [cartCount, setcartCount] = useState(0);
  const [message, setMessage] = useState("");

  const nameInputRef = useRef(null); // input ref
  /* total items ever added,  only increases */
  const totalAddedRef = useRef(0);
  const prevCartRef = useRef(0); // previous cart value
  const timerRef = useRef(null); // timer
  // child ref (imperative handle) like basket to be filled with potatoes
  const productCardRef = useRef(null);
  const productConfig = useRef({
    // stable ref (config)
    currency: "usd",
    stockLimit: 50,
  }).current;
  const product = {
    // stable object
    name: "magic keyboard",
    config: productConfig,
  };

  const handleAdd = () => {
    // save previous before updating
    prevCartRef.current = cartCount;
    totalAddedRef.current += 1;
    setcartCount((c) => c + 1);
    setMessage("adding to cart");

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setMessage("");
    }, 3000);

    productCardRef.current.highlight();
  };

  const handleRemove = () => {
    setcartCount((c) => (c > 0 ? c - 1 : 0));
    setMessage("removing from cart");

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setMessage("");
    }, 2000);

    productCardRef.current.highlight();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>useRef practice</h1>
      <input
        ref={nameInputRef}
        placeholder="product name"
        style={{ padding: 8, marginBottom: 16 }}
      />
      <button
        onClick={() => nameInputRef.current.focus()}
        style={{ marginLeft: 10, padding: 10 }}
      >
        focus input
      </button>
      <hr style={{ margin: "20px 0" }} />
      <h4>
        parent message: {"  "}
        <span style={{ color: "orange" }}>{message && message}</span>
      </h4>
      <ProductCard
        ref={productCardRef}
        product={product}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
      <h3>cart count: {cartCount}</h3>
      <p>previous cart count: {prevCartRef.current}</p>

      <hr />
      <p style={{ opacity: 0.5 }}>
        total products added ever (internal): {totalAddedRef.current}
      </p>
    </div>
  );
}
