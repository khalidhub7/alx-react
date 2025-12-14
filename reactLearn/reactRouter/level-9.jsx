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
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { NavLink, redirect, useLoaderData } from "react-router-dom";

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
const authLoader = () => ({ user: Auth.getUser() });
const requireAuth = ({ request }) => {
  const user = authLoader().user;
  if (user) {
    return null;
  }
  const pathname = new URL(request.url).pathname;
  // redirect-back pattern
  return redirect(`/login?redirectTo=${pathname}`);
};

const requireAdmin = ({ request }) => {
  const user = Auth.getUser();
  if (!user) {
    const path = new URL(request.url).pathname;
    return redirect(`/login?redirectTo=${path}`);
  }
  if (user.role !== "admin") {
    return redirect("/unauthorized");
  }
  return null;
};

/* actions */
const loginAction = async ({ request }) => {
  const fd = await request.formData();
  const email = fd.get("email");
  if (!email) {
    return null;
  }
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
    <div>
      <nav>
        <NavLink to="/">home</NavLink>
        {" | "}
        <NavLink to="/products">products</NavLink>
        {" | "}
        <NavLink to="/checkout">checkout</NavLink>
        {" | "}
        <NavLink to="/dashboard">dashboard</NavLink>
        {" | "}
        {user ? (
          <NavLink to="/logout">logout</NavLink>
        ) : (
          <NavLink to="/login">login</NavLink>
        )}
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

const DashboardLayout = () => <Outlet />;
const Home = () => <h4>home (public)</h4>;
const AdminPanel = () => <h4>admin panel</h4>;
const Products = () => <h4>products (public)</h4>;
const DashboardHome = () => <h4>user dashboard</h4>;
const Checkout = () => <h4>checkout (protected)</h4>;
const Unauthorized = () => <h4>403 — unauthorized</h4>;

const Login = () => (
  <form method="post">
    <input name="email" placeholder="ur email" />
    <button>login</button>
  </form>
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
