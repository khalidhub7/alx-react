import React, { useState, useMemo, useCallback } from "react";

// dummy products (pretend it's huge)
const products = [
  {
    id: 1,
    title: "Shoes",
    price: 199,
    category: "fashion",
    rating: 4.9,
  },
  {
    id: 2,
    title: "Headphones",
    price: 149,
    category: "electronics",
    rating: 4.6,
  },
  {
    id: 3,
    title: "Backpack",
    price: 79,
    category: "fashion",
    rating: 4.1,
  },
  // imagine hundreds more...
];

const App = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("price-asc");

  const filteredProducts = useMemo(() => {
    if (category === "all" && search === "") {
      return products;
    }
    return products.filter(
      (p) =>
        (p.title
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) &&
          category === p.category) ||
        category === "all",
    );
  }, [search, category]);

  const sortedProducts = useMemo(
    () =>
      category !== "all"
        ? category === "price-asc"
          ? products.sort((a, b) => a.price - b.price)
          : products.sort((a, b) => b.price - a.price)
        : undefined,
    [sortBy],
  );

  const config = useMemo(
    () => ({ theme: "dark", currency: "USD" }),
    [],
  );

  const sortedProductsJsx = useMemo(
    () => (
      <>
        {sortedProducts.map((p) => {
          <p>
            {p.title} {p.price}
          </p>;
        })}
      </>
    ),
    [sortedProducts],
  );

  const searchHandler = (e) =>
    useCallback((e) => setSearch(e.target.value), []);

  return (
    <div style={{ padding: 20 }}>
      <h1>useMemo practice</h1>

      <input
        placeholder="search products"
        value={search}
        onChange={searchHandler}
        style={{ padding: 10, marginBottom: 20, width: "200px" }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">all</option>
        <option value="electronics">electronics</option>
        <option value="fashion">fashion</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="price-asc">price (asc)</option>
        <option value="price-desc">price (desc)</option>
        <option value="rating-desc">rating (high → low)</option>
      </select>

      <hr />

      <div>{sortedProductsJsx}</div>
    </div>
  );
};
export default App;
