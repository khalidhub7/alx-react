import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

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

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.title
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()) &&
          (category === p.category || category === "all"),
      ),
    [search, category],
  );

  const sortedProducts = useMemo(
    () =>
      sortBy.startsWith("price")
        ? sortBy === "price-asc"
          ? [...filteredProducts].sort((a, b) => a.price - b.price) // asc
          : [...filteredProducts].sort((a, b) => b.price - a.price) // desc
        : [...filteredProducts].sort((a, b) => b.rating - a.rating), // rating
    [sortBy, filteredProducts],
  );

  useEffect(() => {
    console.log(sortBy);
    console.log(sortedProducts);
  }, [sortBy]);

  const config = useMemo(
    () => ({ theme: "dark", currency: "USD" }),
    [],
  );

  const sortedProductsJsx = useMemo(
    () => (
      <>
        {sortedProducts.map((p) => (
          <p key={p.id}>
            {p.title} {p.price}${" "}
            <small style={{ color: "red" }}>{p.category}</small>
            <small style={{ color: "green" }}>
              {" "}
              rating: {p.rating}
            </small>
          </p>
        ))}
      </>
    ),
    [sortedProducts],
  );

  const searchHandler = useCallback(
    (e) => setSearch(e.target.value),
    [],
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>useMemo practice</h1>

      <input
        placeholder="search products"
        value={search}
        onChange={searchHandler}
        style={{
          padding: 10,
          margin: 20,
          width: "200px",
          borderRadius: 5,
        }}
      />

      <select
        style={{
          padding: 10,
          margin: 20,
          width: "100px",
          borderRadius: 5,
        }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">all</option>
        <option value="electronics">electronics</option>
        <option value="fashion">fashion</option>
      </select>

      <select
        style={{
          padding: 10,
          margin: 20,
          width: "100px",
          borderRadius: 5,
        }}
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
