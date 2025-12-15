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

import React from "react";
import { useSearchParams } from "react-router-dom";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { page, layout, header, nav, link, active } from "./sharedStyles";
import { productsLayoutWrapper, productTitleText } from "./sharedStyles";
import { container, productList, productCard, btn } from "./sharedStyles";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const DB = [
  { id: "p1", name: "Headphones", category: "electronics", price: 200 },
  { id: "p2", name: "Shoes", category: "fashion", price: 150 },
];

/* components */
const MainLayout = () => (
  <div style={layout}>
    <header style={header}>
      <nav style={nav}>
        <NavLink
          to="/"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          home
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          products
        </NavLink>
        <NavLink
          to="/cart"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          cart
        </NavLink>
        <NavLink
          to="/account"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          account
        </NavLink>
        <NavLink
          to="/invalid-path"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          take me out
        </NavLink>
      </nav>
    </header>
    <main style={container}>
      <Outlet />
    </main>
  </div>
);
const Home = () => <h4 style={page}>home</h4>;
const ProductsLayout = () => (
  <section style={productsLayoutWrapper}>
    <Outlet />
  </section>
);

const ProductsList = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const category = params.get("category") ?? "";
  const sort = params.get("sort");
  const filtered = DB.filter((p) =>
    p.category.includes(category.toLowerCase()),
  ).sort((a, b) =>
    sort === "price-asc" ? a.price - b.price : b.price - a.price,
  );

  return (
    <ul style={productList}>
      {filtered.map((p) => (
        <li key={p.id} style={productCard}>
          <p style={productTitleText}>
            {p.name} {p.price}$
          </p>
          <button onClick={() => navigate(p.id)} style={btn}>
            see
          </button>
        </li>
      ))}

      <li style={productCard}>
        <p style={productTitleText}>Out of Stock Item — 0$</p>
        <button onClick={() => navigate("out-of-stock")} style={btn}>
          see
        </button>
      </li>
    </ul>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const product = DB.find((p) => p.id === id);
  return (
    <div>
      {product ? (
        <div style={page}>
          <h4>product details</h4>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
        </div>
      ) : (
        <ProductNotFound />
      )}
    </div>
  );
};

const ProductNotFound = () => <h4 style={page}>product — not found</h4>;
const Cart = () => <h4 style={page}>cart</h4>;
const AccountLayout = () => <Outlet />;
const AccountHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h4 style={page}>account home</h4>
      <button style={btn} onClick={() => navigate("orders/2")}>
        see orders
      </button>
    </div>
  );
};
const Orders = () => (
  <div style={page}>
    <h4>orders</h4>
    <Outlet />
  </div>
);

const OrderDetails = () => <h4 style={page}>order details</h4>;

const NotFound = () => <h4 style={page}>404 — not found</h4>;

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
          { path: "*", element: <ProductNotFound /> },
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
            children: [{ path: ":id", element: <OrderDetails /> }],
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
