// REACT ROUTER MASTERY — "level 8 practice"
// use only Level 8 learned concepts
/* 
React.lazy, Suspense boundaries,
route-level lazy loading,
layout lazy loading, feature lazy loading,
(v6.4+) lazy route modules,
conditional lazy loading,
micro-split lazy loading,
prefetching (hover preload)
*/

import React, { Suspense, useState, lazy } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useNavigate, useLoaderData, NavLink } from "react-router-dom";

// mock db
// heavy mean this car have a complex preview ui
const DB = {
  cars: [
    { id: "1", model: "BMW M5", price: 90000, heavy: true },
    { id: "2", model: "Toyota Corolla", price: 20000, heavy: false },
    { id: "3", model: "Audi RS7", price: 110000, heavy: true },
  ],
};

// mock network delay
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// lazy imports: load just ui needed
// lets cmnt that bcs it just for learning
/* 
const Home = lazy(() => import("./Home"));
const ProductsLayout = lazy(() => import("./ProductsLayout"));
const ProductsPage = lazy(() => import("./Home"));
const ProductPage = lazy(() => import("./ProductPage")); 
*/

// the heavy ui should use lazy import like 
// const HeavyAnalyticsPanel = lazy(() => import("./HeavyAnalyticsPanel"));
// but for learn purpose lets mock it
const HeavyAnalyticsPanel = async ({ cartId }) => {
  delay(300);
  return <p>[HeavyAnalyticsPanel with id {cartId}]</p>;
};

const Home = () => <h4>🏠 home page</h4>; // main entry
const ProductsLayout = () => <h4>📦 products layout</h4>; // wrapper section
const ProductsPage = () => <h4>🛍️ products page</h4>; // list of items
const ProductPage = () => {
  const p = useLoaderData();
  const [preload, setPreload] = useState(false);

  return (
    <div>
      <p>
        light ui → model: {p.model} price: {p.price}
      </p>
      {p.heavy ? (
        <div>
          <p>this product have heavy</p>

          <NavLink onMouseEnter={() => setPreload((prev) => !prev)}>
            {toggleUi ? "hide" : "show"} heavy ui
          </NavLink>
          {preload ? (
            <Loading>
              <HeavyAnalyticsPanel cartId={p.id} />
            </Loading>
          ) : undefined}
        </div>
      ) : undefined}
    </div>
  );
};

// loaders
const productsLoader = async () => {
  await delay(300);
  return DB.cars;
};

const productLoader = async ({ params }) => {
  await delay(300);
  return DB.cars.find((p) => p.id === params.id);
};

const Loading = ({ children }) => (
  <Suspense fallback={<div>loading ...</div>}>{children}</Suspense>
);

const MainLayout = () => (
  <div style={{ padding: 20 }}>
    <h4>level 8 practice</h4>
    <nav style={{ display: "flex", gap: 16 }}>
      <NavLink to="/">home</NavLink>
      <NavLink to="/products">products</NavLink>
    </nav>
    <hr />
    <Outlet />
  </div>
);

// router config
const router = createBrowserRouter([
  {
    path: "/",
    lazy: () => ({
      element: (
        <Loading>
          <MainLayout />
        </Loading>
      ),
    }),
    children: [
      {
        index: true,
        lazy: () => ({
          element: (
            <Loading>
              <Home />
            </Loading>
          ),
        }),
      },
      {
        path: "products",
        lazy: () => ({
          element: (
            <Loading>
              <ProductsLayout />
            </Loading>
          ),
          loader: productsLoader,
        }),

        children: [
          {
            index: true,
            lazy: () => ({
              element: (
                <Loading>
                  <ProductsPage />
                </Loading>
              ),
            }),
          },
          {
            path: ":id",
            lazy: () => ({
              element: (
                <Loading>
                  <ProductPage />
                </Loading>
              ),
              loader: productLoader,
            }),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
