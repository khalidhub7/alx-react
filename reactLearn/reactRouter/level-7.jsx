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
const productsLoader = async () => {
  await new Promise((r) => setTimeout(r, 2000));

  if (Math.random() < 0.5) {
    // 50% chance
    throw new Response("internal server error", { status: 500 });
  }
  return DB.products;
};
const productLoader = async ({ params }) => {
  const id = params.id;
  if (!id) {
    throw new Response("not found", { status: 404 });
  } else if (id === "1") {
    throw redirect("/products");
  }
  return DB.products.find((i) => i.id === id);
};

// Error Boundaries
const MainLayoutError = () => {
  const err = useRouteError();
  return <ErrComp status={err.status} msg={err.statusText} />;
};
const ProductsError = () => {
  const err = useRouteError();
  const status = err.status;

  switch (status) {
    case 500:
      return <ErrComp status={500} msg={"server exploded"} />;
    case 404:
      return <ErrComp status={404} msg={"product was not found"} />;
    case 410:
      return <ErrComp status={410} msg={"product is no longer available"} />;
    default:
      return <ErrComp status={400} msg={"something went wrong"} />;
  }
};
const ProductError = () => {
  const err = useRouteError();

  switch (err.status) {
    case 404:
      return <ErrComp status={404} msg={"no such product"} />;
    default:
      return <ErrComp status={400} msg={"something went wrong"} />;
  }
};

// comps
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
  const err = (id) =>
    id === "3"
      ? new Response("Gone", { status: 410 })
      : new Response("product not found", { status: 404 });
  return (
    <div style={page}>
      <h4>Products</h4>
      <ul>
        {products.map((p) => (
          <div key={p.id}>
            <li>
              {p.title} {p.price}
            </li>
            <button
              style={btn}
              onClick={() => {
                const error = err(p.id)
                
              }}
            >
              add to cart
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

const ProductPage = () => {
  const product = useLoaderData();
  return (
    <div style={page}>
      <p>
        {product.title} {product.price}
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
