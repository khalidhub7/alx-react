// REACT ROUTER MASTERY — "level 6 practice"
// use only Level 6 learned concepts
/*
Form, useNavigation, useActionData,
redirect, programmatic navigation,
action-based mutation flow
*/

import React from "react";
import { useNavigate, redirect, NavLink, Outlet } from "react-router-dom";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// mock db
let DB = {
  users: [{ email: "admin@mail.com", password: "1234" }],
  products: [
    { id: "1", title: "Shoes", price: 120 },
    { id: "2", title: "Hoodie", price: 80 },
  ],
  cart: [],
};

/* actions */
// login action
export async function loginAction({ request }) {
  let authenticated = false;
  const fd = await request.formData();
  const obj = Object.fromEntries(fd);

  authenticated =
    obj.email === DB.users[0].email && obj.password === DB.users[0].password;

  return authenticated
    ? redirect("/products")
    : { error: "invalid credentials" };
}

// add to cart action
export async function addToCartAction({ request }) {
  const fd = await request.formData();
  const id = fd.get("id");

  const item = DB.cart.find((p) => p.id === id);
  if (item) {
    item.count += 1;
  } else {
    const product = DB.products.find((p) => p.id === id);
    DB.cart.push({ ...product, count: 1 });
  }
  return redirect("/cart");
}

// layout comp
const Layout = () => (
  <div>
    <nav style={{ display: "flex", gap: 20 }}>
      <NavLink to="/">login</NavLink>
      <NavLink to="/products">products</NavLink>
      <NavLink to="/cart">cart</NavLink>
    </nav>
    <hr />
    <Outlet />
  </div>
);

// login comp
const Login = () => {
  const data = useActionData(); // receives { error } if any
  const nav = useNavigation(); // detects submitting/loading
  const isSubmitting = nav.state === "submitting";

  return (
    <div>
      <h4>login</h4>

      <Form method="post">
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button disabled={isSubmitting}>
          {isSubmitting ? "checking..." : "login"}
        </button>
      </Form>
      {data ? <p>{data.error}</p> : undefined}
    </div>
  );
};

// products comp
const Products = () => {
  const navigate = useNavigate();
  const navigateStatus = useNavigation();
  const state = navigateStatus.state;
  return (
    <div>
      <h4>products</h4>

      {DB.products.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <b>{p.title}</b> — ${p.price}
          <br />
          <input type="number" name="id" value={p.id} />
          <button type="submit">{state ? state : "add to cart"}</button>
        </div>
      ))}
      <button onClick={() => navigate("/cart")}>go to cart</button>
    </div>
  );
};

// cart comp
const Cart = () => (
  <div>
    <h2>your cart</h2>
    {DB.cart.map((i) => (
      <li key={i.id}>
        {i.title} x{i.count} — {i.price}
      </li>
    ))}
  </div>
);

// routing config
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Login />,
        action: loginAction,
      },
      {
        path: "products",
        element: <Products />,
        action: addToCartAction,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
