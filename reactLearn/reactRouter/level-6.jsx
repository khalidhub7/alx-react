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
import { page, container, btn, nav, link, active } from "./sharedStyles";
import { layout, header } from "./sharedStyles";
import { form, input, formError } from "./sharedStyles";

// mock db
let DB = {
  users: [{ email: "admin@mail.com", password: "0000" }],
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
  await new Promise((r) => setTimeout(r, 2000));
  return redirect("/cart");
}

// layout comp
const Layout = () => (
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
        <NavLink
          to="/cart"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          cart
        </NavLink>
      </nav>
    </header>
    <div style={container}>
      <Outlet />
    </div>
  </div>
);

// login comp
const Login = () => {
  const data = useActionData(); // receives { error } if any
  const nav = useNavigation(); // detects submitting/loading
  const isSubmitting = nav.state === "submitting";

  return (
    <div style={page}>
      <h4>login</h4>

      <Form method="post" style={form}>
        <input type="email" name="email" style={input} />
        <input type="password" name="password" style={input} />
        <button disabled={isSubmitting} style={btn}>
          {isSubmitting ? "checking..." : "login"}
        </button>
      </Form>
      {data ? <p style={formError}>{data.error}</p> : undefined}
    </div>
  );
};

// products comp
const Products = () => {
  const navigate = useNavigate();
  const nav = useNavigation();
  const isSubmitting = nav.state === "submitting";
  const currentId = nav.formData ? nav.formData.get("id") : undefined;
  return (
    <div style={page}>
      <h4>products</h4>

      {DB.products.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <b>{p.title}</b> — ${p.price}
          <Form method="post" style={form}>
            <input type="hidden" name="id" value={p.id} />
            <button
              type="submit"
              disabled={isSubmitting && currentId === p.id}
              style={btn}
            >
              {isSubmitting && currentId === p.id ? "adding..." : "add to cart"}
              {/* {console.log(
                `isSubmitting: ${isSubmitting} currentId: ${currentId}`,
              )} */}
            </button>
          </Form>
        </div>
      ))}

      <button onClick={() => navigate("/cart")} style={btn}>
        go to cart
      </button>
    </div>
  );
};

// cart comp
const Cart = () => (
  <div style={page}>
    <h2>your cart</h2>
    <ul>
      {DB.cart.map((i) => (
        <li key={i.id}>
          {i.title} x{i.count} — ${i.price * i.count}
        </li>
      ))}
    </ul>
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
