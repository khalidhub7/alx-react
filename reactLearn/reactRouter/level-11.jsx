// REACT ROUTER MASTERY — LEVEL 11 PRACTICE
// PERFORMANCE ARCHITECTURE & DESIGN PATTERNS
/*
Patterns you MUST demonstrate:
- layout loader (shared data)
- route-based code splitting
- minimal loaders (data only)
- deferred non-critical data
- URL as state
- non-blocking navigation
- route-level error boundaries
- stable layouts
- router owns route data
*/

import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useNavigation, NavLink } from "react-router-dom";
import { Outlet, useLoaderData, Await, useNavigate } from "react-router-dom";

import {
  layout,
  header,
  nav,
  link,
  active,
  container,
  btn,
  fallback,
  page,
} from "./sharedStyles";

/* helpers */
const delay = (ms) => new Promise((res) => setTimeout(res, ms));
const fetchUser = async () => {
  await delay(300);
  return { id: "u1", name: "khalid" };
};
const fetchProducts = async (category) => {
  await delay(500);
  return [
    { id: "p1", name: "Laptop", category: "electronics" },
    { id: "p2", name: "Shoes", category: "fashion" },
  ].filter((p) => !category || p.category === category);
};
const fetchAnalytics = async () => {
  await delay(1500); // intentionally slow
  return { visitors: 1200 };
};

/* loaders */
// user fetched once
const dashboardLoader = async () => ({ user: await fetchUser() });

const productsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const { category } = Object.fromEntries(url.searchParams.entries());

  return { products: await fetchProducts(category) };
};

const analyticsLoader = () =>
  defer({
    analytics: fetchAnalytics(),
  });

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
          to="dashboard"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          dashboard
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          products
        </NavLink>
      </nav>
    </header>
    <main style={container}>
      <NavigationFeedback />
      <Outlet />
    </main>
  </div>
);

const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div style={page}>
      <p>{user.name}</p>
      <button style={btn} onClick={() => navigate("/analytics")}>
        see analytics
      </button>
      <Outlet />
    </div>
  );
};

const AnalyticsPage = () => {
  const { analytics } = useLoaderData();

  return (
    <Suspense fallback={<div style={fallback}>loading ...</div>}>
      <Await resolve={analytics}>
        <p style={page}>visitors {analytics.visitors}</p>
      </Await>
    </Suspense>
  );
};

const NavigationFeedback = () => {
  const navigation = useNavigation();
  return navigation.state === "loading" ? (
    <div style={fallback}>loading ...</div>
  ) : null;
};

const ProductsError = () => <div style={page}>Something went wrong.</div>;

// router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            path: "analytics",
            element: <AnalyticsPage />,
            loader: analyticsLoader,
          },
        ],
      },
      {
        path: "products",
        lazy: () => import("./helpers/lvl11/ProductsPage"),
        loader: productsLoader,
        errorElement: <ProductsError />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
