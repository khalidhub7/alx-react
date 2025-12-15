// REACT ROUTER MASTERY — LEVEL 10 PRACTICE
// use only Level 10 learned concepts
/* 
advanced routing design patterns:
- resource vs state (path vs search params)
- layout + index routes
- master–detail routing
- feature-based nesting
- UI state in URL
- section-specific 404s
- splat routes for content
- URL-first thinking
- shallow URLs, deep UI
*/

import React, { useEffect, useState } from "react";
import { NavLink, useParams, useSearchParams, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const DB = [
  { id: "p1", name: "Laptop", category: "electronics", price: 1200 },
  { id: "p2", name: "Headphones", category: "electronics", price: 200 },
  { id: "p3", name: "Shoes", category: "fashion", price: 150 },
];

/* components */
const MainLayout = () => (
  <div>
    <header>
      <nav>
        <NavLink to={"/"}>home</NavLink>
        <NavLink to={"/products"}>products</NavLink>
        <NavLink to={"/cart"}>cart</NavLink>
        <NavLink to={"/account"}>account</NavLink>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </div>
);

const ProductsLayout = () => (
  <section>
    <p>products</p>
    <div>
      <Outlet />
    </div>
  </section>
);

const Home = () => <h4>home</h4>;

const ProductsList = () => {
  const [params, _] = useSearchParams();
  const [filtered, setFiltered] = useState(DB);

  const category = params.get("category") ?? "";
  const sort = params.get("sort");

  useEffect(() => {
    setFiltered(
      DB.filter((p) => p.category.includes(category.toLowerCase())).sort(
        (a, b) =>
          sort === "price-asc" ? a.price - b.price : b.price - a.price,
      ),
    );
  }, [category, sort]);

  return (
    <ul>
      {filtered.map((p) => (
        <li key={p.id}>
          {p.name} -- {p.price}$
        </li>
      ))}
    </ul>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = DB.find((p) => p.id === id);
  return (
    <div>
      <h4>product details</h4>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <p>{product.category}</p>
    </div>
  );
};

const Cart = () => <h4>cart</h4>;
const Orders = () => <h4>orders</h4>;
const AccountLayout = () => <Outlet />;
const NotFound = () => <h4>404 — not found</h4>;
const AccountHome = () => <h4>account home</h4>;
const OrderDetails = () => <h4>order details</h4>;
const ProductsNotFound = () => <h4>products — not found</h4>;

// router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "products",
        element: <ProductsLayout />,
        children: [
          { index: true, element: <ProductsList /> },
          { path: ":id", element: <ProductDetails /> },
          { path: "*", element: <ProductsNotFound /> },
        ],
      },
      { path: "cart", element: <Cart /> },
      {
        path: "account",
        element: <AccountLayout />,
        children: [
          { index: true, element: <AccountHome /> },
          {
            path: "orders",
            element: <Orders />,
            children: [
              {
                path: ":id",
                element: <OrderDetails />,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
