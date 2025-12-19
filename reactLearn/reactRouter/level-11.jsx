// REACT ROUTER MASTERY — LEVEL 11 PRACTICE
// use only Level 11 learned concepts
/* 
performance routing design patterns:
- layout loader pattern
- route-based code splitting
- fast shell + slow content (defer)
- prefetch on intent
- non-blocking navigation
- minimal loaders
- stable layouts
- router owns route data
*/

import React, { Suspense } from "react";
import { Outlet, Link, NavLink, useRouteLoaderData } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useLoaderData, useNavigation, defer, Await } from "react-router-dom";
import { layout, header, nav, link, active, container } from "./sharedStyles";

// mock api
const api = {
  getUser: () =>
    new Promise((res) =>
      setTimeout(() => res({ id: "u1", name: "Khalid" }), 300),
    ),

  getProducts: () =>
    new Promise((res) =>
      setTimeout(
        () =>
          res([
            { id: "p1", name: "Laptop", price: 1200 },
            { id: "p2", name: "Phone", price: 800 },
          ]),
        800,
      ),
    ),

  getAnalytics: () =>
    new Promise((res) => setTimeout(() => res({ visitors: 1240 }), 1500)),
};

/* loaders */
const rootLoader = async () => ({ user: await api.getUser() });

const dashboardLoader = async () => {
  return defer({
    products: await api.getProducts(), // critical data (render immediately)
    analytics: api.getAnalytics(), // slow data (deferred)
  });
};

/* components */
const RootLayout = () => (
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
          to="/"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          dashboard
        </NavLink>
      </nav>
    </header>
    <NavigationState />
    <main style={container}>
      <Outlet />
    </main>
  </div>
);

const ProductsPage = () => {
  const { products } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" ? <p>loading ...</p> : null}
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

const AnalyticsWidget = ({ analytics }) => {
  const { analytics } = useLoaderData();

  return (
    <Suspense fallback={<p>loading ...</p>}>
      <Await resolve={analytics}>
        <div>
          <p>analytics: {`< ${analytics.visitors} >`}</p>
        </div>
      </Await>
    </Suspense>
  );
};

const NavigationState = () => {
  const navigation = useNavigation();
  return (
    <div>{navigation.state === "loading" ? <p>loading ...</p> : null}</div>
  );
};

/* ---------------------------------- */
/* TODO 8 — ROUTE-BASED CODE SPLITTING */
/* ---------------------------------- */
/*
- Dashboard route MUST be lazy-loaded
*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: rootLoader,
    children: [
      {
        path: "dashboard",
        lazy: () => import("./helpers/lvl11/Dashboard"),
        loader: dashboardLoader,
        children: [
          {
            path: "products",
            element: <ProductsPage />,
          },
          { path: "analytics", element: <AnalyticsWidget /> },
        ],
      },
    ],
  },
]);

const App = () => (
  <Suspense fallback={<p>loading app...</p>}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
