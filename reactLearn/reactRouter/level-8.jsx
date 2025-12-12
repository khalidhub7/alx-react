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

import React, { Suspense, useState, lazy, useRef, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useLoaderData, NavLink } from "react-router-dom";

// mock db
// heavy: mean this car have a complex preview ui
const DB = {
  cars: [
    { id: "1", model: "BMW M5", price: 90000, heavy: true },
    { id: "2", model: "Toyota Corolla", price: 20000, heavy: false },
    { id: "3", model: "Audi RS7", price: 110000, heavy: true },
  ],
};

/* helpers */
// mock network delay
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const Loading = ({ children }) => (
  <Suspense fallback={<div>loading ...</div>}>{children}</Suspense>
);
const HeavyAnalyticsPanelComp = ({ cartId }) => (
  <p>[HeavyAnalyticsPanel with id {cartId}]</p>
);

/*  loaders */
const productsLoader = async () => {
  await delay(300);
  return DB.cars;
};

const productLoader = async ({ params }) => {
  await delay(300);
  return DB.cars.find((p) => p.id === params.id);
};

// the task normally want that below commented code
// route-level lazy loading (The page loads only when the user opens that route)
/*
const Home = lazy(() => import("./Home"));
const ProductsLayout = lazy(() => import("./ProductsLayout"));
const ProductsPage = lazy(() => import("./ProductsPage"));
const ProductPage = lazy(() => import("./ProductPage"));
*/

// but i mock it with that code for learn purpose
const Home = () => <h4>🏠 home page</h4>;
const ProductsLayout = () => <h4>📦 products layout</h4>;

const ProductsPage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  return (
    <div>
      <h4>🛍️ products page</h4>
      <ul>
        {data.map((c) => (
          <li key={c.id}>
            <p>
              {c.model} {c.price}
            </p>
            <button onClick={() => navigate(c.id)}>discover the car</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductPage = () => {
  const p = useLoaderData();
  const [show, setShow] = useState(false);
  const isHeavyUiLoadedBefore = useRef(false);
  const firstRender = useRef(true);
  const [HeavyAnalyticsPanel, setHeavyAnalyticsPanel] = useState(undefined);

  useEffect(() => {
    if (firstRender) {
      // to prevent first render
      firstRender.current = false;
      return;
    }
    if (isHeavyUiLoadedBefore.current) {
      return;
    }
    // micro-split lazy loading (heavy component loads only when needed)
    // the task normally want that below commented code
    // setHeavyAnalyticsPanel(lazy(() => import("./HeavyAnalyticsPanel")));
    // but i mock it with that code for learn purpose
    console.log("micro-split lazy loading ...");
    setHeavyAnalyticsPanel(HeavyAnalyticsPanelComp);
    isHeavyUiLoadedBefore.current = true;
  }, [show]);

  return (
    <div>
      <p>
        light ui → model: {p.model} price: {p.price}
      </p>
      {p.heavy ? (
        <div>
          <p>this product have heavy</p>

          <button onClick={() => setShow((prev) => !prev)}>
            {show ? "hide" : "show"} heavy ui
          </button>

          {show ? (
            <Loading>
              <HeavyAnalyticsPanel cartId={p.id} />
            </Loading>
          ) : undefined}
        </div>
      ) : undefined}
    </div>
  );
};

const MainLayout = () => (
  <div style={{ padding: 20 }}>
    <h4>level 8 practice</h4>
    <nav style={{ display: "flex", gap: 16 }}>
      {/* the task normally want that below commented code */}
      {/* lets create a prefetching */}
      {/* <NavLink to="/" onMouseEnter={() => import("./Home")}>
        home
      </NavLink>
      <NavLink
        to="/products"
        onMouseEnter={() => {
          import("./ProductsPage");
          import("./ProductsLayout");
        }}
      >
        products
      </NavLink> */}

      {/* but i mock it with that code for learn purpose */}
      {/* lets mock no imports */}
      <NavLink to="/" onMouseEnter={() => console.log("prefetching...")}>
        home
      </NavLink>
      <NavLink
        to="/products"
        onMouseEnter={() => console.log("prefetching...")}
      >
        products
      </NavLink>
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
