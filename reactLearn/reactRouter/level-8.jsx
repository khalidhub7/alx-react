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

import { NavLink } from "react-router-dom";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense, lazy, useState, useRef, useEffect } from "react";

import { productList, productCard, page } from "./sharedStyles";
import { productTitleText, heavyPanel, fallback } from "./sharedStyles";
import { btn, heavyContainer, productsLayoutWrapper } from "./sharedStyles";
import { layout, header, nav, link, active, container } from "./sharedStyles";

// mock db
// heavy: mean this car have a complex preview ui
const DB = {
  cars: [
    { id: "1", model: "BMW M5", price: 90000, heavy: true },
    { id: "2", model: "Toyota Corolla", price: 20000, heavy: false },
    { id: "3", model: "Audi RS7", price: 110000, heavy: true },
  ],
};

/*  loaders */
const productsLoader = async () => DB.cars;

const productLoader = async ({ params }) =>
  DB.cars.find((p) => p.id === params.id);

// route-level lazy loading
// (The page loads only when the user opens that route)

// PURE LOGIC (real project) will mocked below
// const Home = lazy(() => import("./helpers/lvl8/Home"));
// const ProductPage = lazy(() => import("./helpers/lvl8/ProductPage"));
// const ProductsPage = lazy(() => import("./helpers/lvl8/ProductsPage"));
// const ProductsLayout = lazy(() => import("./helpers/lvl8/ProductsLayout"));

/* helpers */
const Loading = ({ children }) => (
  <Suspense fallback={<div style={fallback}>loading component ...</div>}>
    {children}
  </Suspense>
);

const HomeComp = () => (
  <div style={page}>
    <h2>🏠 Home Page</h2>
    <p>Level 8 practice</p>
  </div>
);

const ProductsLayoutComp = () => (
  <div style={productsLayoutWrapper}>
    <h2>📦 Products</h2>
    <Outlet />
  </div>
);

const ProductsPageComp = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h3>🛍️ products list</h3>

      <ul style={productList}>
        {data.map((c) => (
          <li key={c.id} style={productCard}>
            <p style={productTitleText}>
              {c.model} — <strong>${c.price}</strong>
            </p>

            <button style={btn} onClick={() => navigate(c.id)}>
              discover the car
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HeavyAnalyticsPanelComp = ({ cartId }) => (
  <div style={heavyPanel}>
    <p>[HeavyAnalyticsPanel with id {cartId}]</p>
  </div>
);

const ProductPageComp = () => {
  const p = useLoaderData();
  const [show, setShow] = useState(false);
  const firstRender = useRef(true);
  const isHeavyUiLoadedBefore = useRef(false);
  const [HeavyAnalyticsPanel, setHeavyAnalyticsPanel] = useState(undefined);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (isHeavyUiLoadedBefore.current) return;

    console.log("micro-split lazy loading ...");

    setHeavyAnalyticsPanel(
      lazy(
        () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({ default: HeavyAnalyticsPanelComp });
            }, 1000);
          }),
      ),
    );

    isHeavyUiLoadedBefore.current = true;
  }, [show]);

  return (
    <div style={page}>
      <h3>{p.model}</h3>
      <p>
        <strong>Price:</strong> ${p.price}
      </p>

      {p.heavy ? (
        <div style={heavyContainer}>
          <p>this product has a heavy UI preview</p>

          <button style={btn} onClick={() => setShow((prev) => !prev)}>
            {show ? "hide" : "show"} heavy ui
          </button>

          {show && HeavyAnalyticsPanel ? (
            <Loading>
              <HeavyAnalyticsPanel cartId={p.id} />
            </Loading>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

/* mocked lazy imports */

const Home = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ default: HomeComp }), 1000);
    }),
);

const ProductsLayout = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ default: ProductsLayoutComp }), 1000);
    }),
);

const ProductsPage = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ default: ProductsPageComp }), 1000);
    }),
);

const ProductPage = lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve({ default: ProductPageComp }), 1000);
    }),
);

const MainLayout = () => (
  <div style={layout}>
    {/* header */}
    <header style={header}>
      <nav style={nav}>
        {/* lets create a prefetching */}
        <NavLink
          to="/"
          onMouseEnter={() => {
            console.log("importing the Home comp ...");
            // import("./helpers/lvl8/Home");
          }}
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          home
        </NavLink>

        <NavLink
          to="/products"
          onMouseEnter={() => {
            console.log(
              "importing the ProductsPage and ProductsLayout comps ...",
            );
            // import("./helpers/lvl8/ProductsPage");
            // import("./helpers/lvl8/ProductsLayout");
          }}
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          products
        </NavLink>
      </nav>
    </header>

    {/* container */}
    <main style={container}>
      <Outlet />
    </main>
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
        }),
        children: [
          {
            index: true,
            loader: productsLoader,
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
            loader: productLoader,
            lazy: () => ({
              element: (
                <Loading>
                  <ProductPage />
                </Loading>
              ),
            }),
          },
        ],
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
