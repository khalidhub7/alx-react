// REACT ROUTER MASTERY — "level 5 practice"
// use only Level 5 learned concepts
/*
loaders, actions, createBrowserRouter,
  RouterProvider, Form, redirect, errorElement,
  useLoaderData, useActionData
*/

import React from "react";
import { createBrowserRouter, Link } from "react-router-dom";
import { RouterProvider, useLoaderData } from "react-router-dom";
import { useActionData, Form, redirect } from "react-router-dom";

// mock db
let DB = {
  products: [
    { id: "1", title: "Laptop", price: 999 },
    { id: "2", title: "Phone", price: 699 },
  ],
  cart: [],
};

// cart items count
const layoutLoader = () => DB.products.length;
// return featured products (all for learning purpose)
const homeLoader = () => DB.products;
// all products
const productsLoader = () => DB.products;

// product by params.id
const productDetailLoader = ({ params }) =>
  // both are strings so no type checking
  DB.products.find((i) => i.id === params.id);

// add to cart action
const addToCartAction = async ({ request }) => {
  // console.log(Object.keys(request))

  const { id } = request.GetForm();
  const check = DB.cart.find((i) => i.id === id);
  if (check) {
    DB.cart = DB.cart.map((p) =>
      p.id === id ? { ...p, count: p.count + 1 } : p,
    );
  } else {
    DB.cart.push({
      ...DB.products.find((i) => i.id === id),
      count: 1,
    });
  }
  redirect("/cart");
};

// cart
const cartLoader = () => DB.cart;

// err handler
const ErrorElement = () => (
  <h4>❌ something went wrong loading data.</h4>
);

// layout comp
const Layout = () => {
  const data = useLoaderData();

  return (
    <div style={{ padding: 20 }}>
      <h2>🛒level 5 practice</h2>
      <p>cart Items: {data}</p>
      <hr />

      <Outlet />
    </div>
  );
};

// home comp
const Home = () => {
  const products = useLoaderData();
  return (
    <div>
      <h3>🏠 home</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} {p.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

// product page comp
const Products = () => {
  const products = useLoaderData();
  return (
    <div>
      <h3>🛒 all Products</h3>
      {/* TODO: map products (title + link to detail) */}
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {/* later */}
            {p.title} <Link to="">details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// product details
const ProductDetail = () => {
  const product = useLoaderData();
  const actionResult = useActionData();
  return !actionResult ? (
    <div>
      <h3>📦 product detail</h3>
      <p>
        {p.title} {p.price}
      </p>

      <Form>
        <input value={product.title} disabled></input>
        <button type="submit">add to cart</button>
      </Form>
    </div>
  ) : undefined;
};

// cart comp
const Cart = () => {
  const cart = useLoaderData();
  return (
    <div>
      <h3>🛒 your cart</h3>
      <ul>
        {cart.map((p) => (
          <li>
            {p.title} x {p.count} {p.price}dh
          </li>
        ))}
      </ul>
    </div>
  );
};

// router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: layoutLoader,
    errorElement: <ErrorElement />,

    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "products",
        element: <Products />,
        loader: productsLoader,
        errorElement: <ErrorElement />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
        loader: productDetailLoader,
        action: addToCartAction,
        errorElement: <ErrorElement />,
      },
      {
        path: "cart",
        element: <Cart />,
        loader: cartLoader,
        errorElement: <ErrorElement />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
