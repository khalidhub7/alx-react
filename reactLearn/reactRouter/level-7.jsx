// REACT ROUTER MASTERY — "level 7 practice"
// use only Level 7 learned concepts
/* 
loader, errorElement, useLoaderData,
useRouteError, Response errors (throw),
nested route boundaries, redirect on error,
bubble-up boundaries
*/

import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useLoaderData, useRouteError, redirect } from "react-router-dom";

// mock db
let DB = {
  products: [
    { id: "1", title: "Shoes", price: 120 },
    { id: "2", title: "Hoodie", price: 80 },
    { id: "3", title: "Hat", price: 30 },
  ],
  users: [{ id: "u1", name: "Admin", role: "admin" }],
};

// utility
const check = (res) => {
  if (!res.ok) {
    throw new Response(res.statusText, { status: res.status });
  }
  return res;
};

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

// main layout
const MainLayout = () => (
  <>
    <h4>level 4 practice</h4>
    <div className="page">
      <Outlet />
    </div>
  </>
);

// MainLayout Error Boundary
const MainLayoutError = () => {
  const err = useRouteError(); // expect a 'Response' err
  return <ErrComp status={err.status} msg={err.statusText} />;
};

// products loader
const productsLoader = async () => {
  await new Promise((r) => setTimeout(r, 2000));

  if (Math.random() < 0.5) {
    // 50% chance
    throw new Response("internal server error", { status: 500 });
  }
  return DB.products;
};

// products comp
const ProductsPage = () => {
  const products = useLoaderData(); // expect a 'Response' obj
  const err = (id) =>
    id === "3"
      ? new Response("Gone", { status: 410 })
      : new Response("product not found", { status: 404 });
  return (
    <div>
      <h4>Products</h4>
      <ul>
        {products.map((p) => (
          <>
            <li key={p.id}>
              {p.title} {p.price}
            </li>
            <button onClick={check(err(p.id))}>add to cart</button>
          </>
        ))}
      </ul>
    </div>
  );
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

const productLoader = async ({ params }) => {
  const id = params.get("id");
  if (!id) {
    throw new Response("not found", { status: 404 });
  } else if (id === "1") {
    throw redirect("/products");
  }
  return new Response(
    DB.products.find((i) => i.id === id),
    { status: 200 },
  );
};

const ProductPage = () => {
  const product = check(useLoaderData());
  return (
    <div>
      <p>
        {product.title} {product.price}
      </p>
    </div>
  );
};

const ProductError = () => {
  const err = check(useRouteError());

  switch (err.status) {
    case 404:
      return <ErrComp status={404} msg={"no such product"} />;
    default:
      return <ErrComp status={400} msg={"something went wrong"} />;
  }
};

// router config
const router = createBrowserRouter([
  {
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
