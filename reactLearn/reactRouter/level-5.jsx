// REACT ROUTER MASTERY — "level 5 practice"
// use only Level 5 learned concepts
/*
loaders, actions, createBrowserRouter,
  RouterProvider, Form, redirect, errorElement,
  useLoaderData, useActionData
*/

import React from "react";
import {
  useNavigation,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { RouterProvider, useLoaderData } from "react-router-dom";
import { useActionData, Form, redirect } from "react-router-dom";
import { createBrowserRouter, Link, Outlet } from "react-router-dom";
import { nav, layout, container, page, btn } from "./sharedStyles";
import { link, active, header } from "./sharedStyles";

// mock db
let DB = {
  products: [
    { id: "1", title: "Laptop", price: 999 },
    { id: "2", title: "Phone", price: 699 },
  ],
  cart: [],
};

/* loaders */
// cart items count
const layoutLoader = () => ({ cartCount: DB.cart.length });
// return featured products (all for learning purpose)
const homeLoader = () => DB.products;
// all products
const productsLoader = () => DB.products;
// product by params.id
const productDetailLoader = ({ params }) => {
  // both are strings so no type checking
  const product = DB.products.find((i) => i.id === params.id);
  if (!product) throw new Response("not found", { status: 404 });
  return product;
};
// cart
const cartLoader = () => DB.cart;

/* actions */
// add to cart action
const addToCartAction = async ({ request }) => {
  // console.log(Object.keys(request))
  const formD = await request.formData();
  const id = formD.get("id");
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
  return redirect("/cart");
};

// err handler
const ErrorElement = () => (
  <h4 style={page}>❌ something went wrong loading data.</h4>
);

/* components */
// layout comp
const Layout = () => {
  const data = useLoaderData();

  return (
    <div style={layout}>
      <header style={header}>
        <nav style={nav}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              ...link,
              ...active(isActive),
            })}
          >
            home
          </NavLink>

          <NavLink
            to="/products"
            style={({ isActive }) => ({
              ...link,
              ...active(isActive),
            })}
          >
            products
          </NavLink>

          <NavLink
            to="/cart"
            style={({ isActive }) => ({
              ...link,
              ...active(isActive),
            })}
          >
            cart
          </NavLink>
        </nav>
      </header>

      <div style={container}>
        <h4>🛒level 5 practice</h4>
        <p>cart Items: {data.cartCount}</p>
        <hr />

        <Outlet />
      </div>
    </div>
  );
};

// home comp
const Home = () => {
  const products = useLoaderData();
  const navigate = useNavigate();
  return (
    <div style={page}>
      <h4>🏠 home</h4>
      <p>top products</p>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} {p.price}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/products")} style={btn}>
        see all products
      </button>
    </div>
  );
};

// product page comp
const Products = () => {
  const products = useLoaderData();
  return (
    <div style={page}>
      <h4>🛒 all Products</h4>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} <Link to={p.id}>details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// product details
const ProductDetail = () => {
  const product = useLoaderData();
  /* const actionResult = useActionData(); */
  const nvg = useNavigation(); // track form state
  // const isAdding = nvg.state === "submitting";
  return (
    <div style={page}>
      <h4>📦 product detail</h4>
      <p>
        {product.title} — {product.price}
      </p>

      <Form method="post">
        <input type="hidden" name="id" value={product.id} />
        <button type="submit" style={btn}>
          add to cart
        </button>
      </Form>
    </div>
  );
};

// cart comp
const Cart = () => {
  const cart = useLoaderData();
  return (
    <div style={page}>
      <h4>🛒 your cart</h4>
      <ul>
        {cart.map((p) => (
          <li key={p.id}>
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
