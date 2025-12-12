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
import React, { Suspense, lazy } from "react";
import { Loading } from "./helpers/lvl8/utils";
import { layout, header, nav, link, active, container } from "./sharedStyles";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

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
const productsLoader = async () => {
  return DB.cars;
};

const productLoader = async ({ params }) => {
  return DB.cars.find((p) => p.id === params.id);
};

// route-level lazy loading
// (The page loads only when the user opens that route)
const Home = lazy(() => import("./helpers/lvl8/Home"));
const ProductPage = lazy(() => import("./helpers/lvl8/ProductPage"));
const ProductsPage = lazy(() => import("./helpers/lvl8/ProductsPage"));
const ProductsLayout = lazy(() => import("./helpers/lvl8/ProductsLayout"));

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
            import("./helpers/lvl8/Home");
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

            import("./helpers/lvl8/ProductsPage");
            import("./helpers/lvl8/ProductsLayout");
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
      // route-level lazy loading
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
            lazy: () => ({
              element: (
                <Loading>
                  <ProductsPage />
                </Loading>
              ),
            }),
            loader: productsLoader,
          },
          {
            path: ":id",
            lazy: () => ({
              element: (
                <Loading>
                  <ProductPage />
                </Loading>
              ),
            }),
            loader: productLoader,
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
