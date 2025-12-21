// REACT ROUTER MASTERY — LEVEL 11 PRACTICE
// use only Level 11 learned concepts
/* 
performance routing design patterns:
- layout loader (shared data)
- route owns data (no fetching in components)
- minimal loaders (no over-fetching)
- deferred non-critical data
- navigation state UX
- persistent layout (no re-mount)
- URL state via search params
- intent-based prefetch (hint only)
- progressive enhancement (<Form>)
- performance-first thinking
Note:
- Do not implement lazy loading in this file (single-file rule)
- Add a comment where lazy loading should be used
*/

import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NavLink, Outlet, redirect, Await, Form } from "react-router-dom";
import { useLoaderData, useNavigation, defer, Link } from "react-router-dom";

import { page, form, input, productList, fallback } from "./sharedStyles";
import { layout, header, nav, link, active, container } from "./sharedStyles";
import { productCard, productTitleText, linkButton, btn } from "./sharedStyles";

// mock db
const products = [
  { id: "p1", name: "Laptop", price: 1200, category: "electronics" },
  { id: "p2", name: "Shoes", price: 150, category: "fashion" },
];
const reviews = { p1: ["Great", "Fast"], p2: ["Comfortable"] };
const user = { id: "u1", name: "Khalid" };
const DB = {
  user,
  products: new Promise((res) => setTimeout(() => res(products), 300)),
  reviews: new Promise((res) => setTimeout(() => res(reviews), 600)),
};

/* loaders */

// layout loader (shared data)
const dashboardLoader = () => ({ user: DB.user });

// minimal loaders (no over-fetching)
// URL state via search params
const productsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const { category, price } = Object.fromEntries(url.searchParams.entries());

  const all = await DB.products;
  const products = all.filter(
    (p) =>
      (!category || p.category === category) &&
      (!price || p.price <= Number(price)),
  );

  return { products };
};

// performance-first thinking
const productDetailsLoader = async ({ params }) => {
  const { id } = params;
  return defer({
    // immediate → load now
    product: await DB.products.then((data) => data.find((p) => p.id === id)),
    // deferred (loads in background)
    reviews: DB.reviews.then((r) => r[id]),
  });
};

/* actions */
const productsAction = async ({ request }) => {
  const fd = await request.formData();
  const params = new URLSearchParams(fd);

  return redirect(`/products?${params.toString()}`);
};

/* components */

// persistent layout (no re-mount)
const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div style={layout}>
      {/* persistent layout */}
      <header style={header}>
        <nav style={nav}>
          <NavLink
            to="/"
            style={({ isActive }) => ({ ...link, ...active(isActive) })}
          >
            home
          </NavLink>

          {/* intent-based prefetch (hint only) */}
          <NavLink
            to="/products"
            prefetch="intent"
            style={({ isActive }) => ({ ...link, ...active(isActive) })}
          >
            Products
          </NavLink>
        </nav>
      </header>

      <main style={container}>
        {/* navigation state UX */}
        {navigation.state === "loading" && <p style={fallback}>Loading...</p>}
        <h3>Welcome {user.name || "guest"}</h3>
        <Outlet />
      </main>
    </div>
  );
};

// route owns data (no fetching in components)
const ProductsPage = () => {
  const { products } = useLoaderData();

  return (
    <section style={page}>
      <h4>Products</h4>

      {/*
        progressive Enhancement Pattern
        works without JavaScript
        router handles submission + navigation
        URL becomes the source of truth
      */}

      <Form method="post" style={form}>
        <select name="category" defaultValue="" style={input}>
          <option value="" disabled>
            select category
          </option>
          <option value="electronics">electronics</option>
          <option value="fashion">fashion</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="max price"
          style={input}
        />

        <button type="submit" style={btn}>
          Apply
        </button>
      </Form>

      <ul style={productList}>
        {products.map((p) => (
          <li key={p.id} style={productCard}>
            <p style={productTitleText}>{p.name}</p>
            <Link to={p.id} style={linkButton}>
              view
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

const ProductDetails = () => {
  const { product, reviews } = useLoaderData();

  return (
    <section style={page}>
      <h4>{product.name}</h4>
      <p>{product.price}$</p>

      {/* deferred data 
          render page immediately, wait only for reviews
      */}
      <Suspense fallback={<p style={fallback}>Loading reviews...</p>}>
        <Await resolve={reviews}>
          {(data) => (
            <ul style={productList}>
              {data.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </section>
  );
};

// router config
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    loader: dashboardLoader,
    children: [
      {
        path: "products",
        loader: productsLoader,
        action: productsAction,

        // LAZY LOADING PATTERN (Level 11)
        // This route should be code-split in a real app
        // lazy: () => import("./ProductsPage")

        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        loader: productDetailsLoader,
        element: <ProductDetails />,
      },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
