// REACT ROUTER MASTERY — "level 7 practice"
// use only Level 7 learned concepts
/* 
loader, errorElement, useLoaderData,
useRouteError, Response errors (throw),
nested route boundaries, redirect on error,
bubble-up boundaries
*/

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useLoaderData, useRouteError, redirect } from "react-router-dom";
import { link, active } from "./sharedStyles";
import { page, btn, layout, header, nav, container } from "./sharedStyles";

// mock db
let DB = {
  products: [
    { id: "1", title: "Shoes", price: 120 },
    { id: "2", title: "Hoodie", price: 80 },
    { id: "3", title: "Hat", price: 30 },
  ],
  users: [{ id: "u1", name: "Admin", role: "admin" }],
};
// helpers
const ErrComp = ({ status, msg }) => (
  <div>
    <h4>something went wrong</h4>
    <p>
      status: <code>{status}</code>
    </p>
    <p>
      message: <code>{msg}</code>
    </p>
  </div>
);

// loaders
const homeLoader = () => Math.random() < 0.5; // 50% chance

const productsLoader = async () => {
  /* await new Promise((r) => setTimeout(r, 2000)); */

  if (Math.random() < 0.5) {
    // 50% chance
    throw new Response("internal server error", { status: 500 });
  }
  return DB.products;
};
const productLoader = async ({ params }) => {
  const id = params.id;
  const product = DB.products.find((i) => i.id === id);
  if (!product) {
    throw new Response("not found", { status: 404 });
  } else if (id === "1") {
    throw redirect("/products");
  }
  return product;
};

// Error Boundaries
const MainLayoutError = () => {
  const err = useRouteError();
  return <ErrComp status={err.status} msg={err.statusText} />;
};
const ProductsError = () => {
  const err = useRouteError();
  const { status, statusText } = err;
  return <ErrComp status={status} msg={statusText} />;
};
const ProductError = () => {
  const err = useRouteError();
  const { status, statusText } = err;
  return <ErrComp status={status} msg={statusText} />;
};

// comps

// home comp
const Home = () => {
  const navigate = useNavigate();
  /* const auth = useLoaderData(); */
  const auth = false;
  return (
    <button style={btn} onClick={() => navigate("/products")} disabled={auth}>
      {auth ? "Guest Limit Reached" : "Continue as Guest"}
    </button>
  );
};

// main layout
const MainLayout = () => (
  <div style={layout}>
    <header style={header}>
      <nav style={nav}>
        <NavLink
          to="/"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          login
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          products
        </NavLink>
      </nav>
    </header>
    <div style={container}>
      <Outlet />
    </div>
  </div>
);

// products comp
const ProductsPage = () => {
  const products = useLoaderData();
  const navigate = useNavigate();
  return (
    <div style={page}>
      <h4>products</h4>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} {p.price}
            <button style={btn} onClick={() => navigate(p.id)}>
              add to cart
            </button>
          </li>
        ))}
        {/* not found product */}
        <li key={"5"}>
          rx580 100$
          <button style={btn} onClick={() => navigate("5")}>
            add to cart
          </button>
        </li>
      </ul>
    </div>
  );
};

const ProductPage = () => {
  const product = useLoaderData();
  /* const err = (id) =>
    id === "3"
      ? new Response("Gone", { status: 410 })
      : new Response("product not found", { status: 404 });
  err(id); */
  return (
    <div style={page}>
      <p>
        _| {product.title} -- {product.price}$
      </p>
    </div>
  );
};

// router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <MainLayoutError />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
      },
      {
        path: "products",
        loader: productsLoader,
        element: <ProductsPage />,
        errorElement: <ProductsError />,
      },
      {
        path: "products/:id",
        loader: productLoader,
        element: <ProductPage />,
        errorElement: <ProductError />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
