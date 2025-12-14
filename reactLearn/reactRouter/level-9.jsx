// level-9.jsx
// REACT ROUTER MASTERY — LEVEL 9 PRACTICE
// use only Level 9 learned concepts
/* 
auth design patterns:
- loader-based route guards
- redirect-back pattern
- layout-level protection
- role-based access (admin)
- logout as navigation
- auth as data (not UI state)
*/

import React from "react";
import { page, layout, header, nav, link } from "./sharedStyles";
import { active, container, btn, form, input } from "./sharedStyles";
import { NavLink, redirect, useLoaderData, Form } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

// mock db
let DB = {
  users: [
    { id: "u1", email: "user@test.com", role: "user" },
    { id: "u2", email: "admin@test.com", role: "admin" },
  ],
};

const Auth = {
  login(email) {
    const user = DB.users.find((u) => u.email === email);
    if (!user) throw new Error("invalid credentials");
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout() {
    localStorage.removeItem("user");
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
};

/* loaders */
const authLoader = () => {
  const user = Auth.getUser();
  console.log(`parent loader user <${user || undefined}>`);
  return { user };
};

const requireAuth = ({ request }) => {
  console.log("requireAuth loader called");
  const user = Auth.getUser();
  if (user) return null;

  const pathname = new URL(request.url).pathname;
  // redirect-back pattern
  return redirect(`/login?redirectTo=${pathname}`);
};

const requireAdmin = () => {
  const user = Auth.getUser();

  // the user is always defined
  // otherwise the parent loader would redirect
  // bcs parent loaders run before child loaders
  if (user.role !== "admin") {
    return redirect("/unauthorized");
  }
  return null;
};

/* actions */
const loginAction = async ({ request }) => {
  const fd = await request.formData();
  const email = fd.get("email");
  console.log(email);
  if (!email) return null;

  Auth.login(email);
  const path = new URL(request.url).searchParams.get("redirectTo");
  return redirect(path || "/");
};

const logoutAction = () => {
  Auth.logout();
  return redirect("/");
};

/* components */

const Layout = () => {
  const { user } = useLoaderData();

  return (
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
            to="/checkout"
            style={({ isActive }) => ({ ...link, ...active(isActive) })}
          >
            checkout
          </NavLink>
          <NavLink
            to="/dashboard"
            style={({ isActive }) => ({ ...link, ...active(isActive) })}
          >
            dashboard
          </NavLink>
          {user ? (
            <NavLink
              to="/logout"
              style={({ isActive }) => ({ ...link, ...active(isActive) })}
            >
              logout
            </NavLink>
          ) : (
            <NavLink
              to="/login"
              style={({ isActive }) => ({ ...link, ...active(isActive) })}
            >
              login
            </NavLink>
          )}
        </nav>
      </header>

      <main style={container}>
        <Outlet />
      </main>
    </div>
  );
};

const DashboardLayout = () => <Outlet />;
const Home = () => <h4 style={page}>home (public)</h4>;
const Products = () => <h4 style={page}>products (public)</h4>;
const Checkout = () => <h4 style={page}>checkout (protected)</h4>;
const DashboardHome = () => <h4 style={page}>user dashboard</h4>;
const AdminPanel = () => <h4 style={page}>admin panel</h4>;
const Unauthorized = () => <h4 style={page}>403 — unauthorized</h4>;

const Login = () => (
  <Form method="post" style={form}>
    <input name="email" placeholder="ur email" style={input} />
    <button style={btn}>login</button>
  </Form>
);

// router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: authLoader,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      {
        path: "checkout",
        element: <Checkout />,
        loader: requireAuth,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: requireAuth,
        children: [
          { index: true, element: <DashboardHome /> },
          {
            path: "admin-panel",
            element: <AdminPanel />,
            loader: requireAdmin,
          },
        ],
      },
      { path: "login", element: <Login />, action: loginAction },
      { path: "unauthorized", element: <Unauthorized /> },
      { path: "logout", action: logoutAction },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
