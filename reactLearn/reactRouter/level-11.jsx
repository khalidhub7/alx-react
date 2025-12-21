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
*/

/* ❌ DO NOT implement lazy loading (single-file rule)
✅ Leave a comment where it SHOULD be used */

import React, { Suspense } from "react";
import { createBrowserRouter, NavLink, RouterProvider } from "react-router-dom";
import { useLoaderData, Outlet, redirect } from "react-router-dom";
import { useNavigation, defer, Await, Form, Link } from "react-router-dom";

// mock db
const products = [
  { id: "p1", name: "Laptop", price: 1200, category: "electronics" },
  { id: "p2", name: "Shoes", price: 150, category: "fashion" },
];
const reviews = { p1: ["Great", "Fast"], p2: ["Comfortable"] };
const DB = {
  user: { id: "u1", name: "Khalid" },
  products: new Promise((res) => setTimeout(() => res(products), 300)),
  reviews: new Promise((res) => setTimeout(() => res(reviews), 600)),
};

/* loaders */

// layout loader (shared data)
const dashboardLoader = () => ({ user: DB.user });

// minimal loaders (no over-fetching)
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

const productDetailsLoader = async ({ params }) => {
  const { id } = params;
  return defer({
    product: await DB.products.then((data) => data.find((p) => p.id === id)), // immediate
    reviews: DB.reviews.then((r) => r[id]), // deferred
  });
};

/* actions */
const productsAction = async ({ request }) => {
  const fd = await request.formData();
  const params = new URLSearchParams(fd);

  return redirect(`/products?${params.toString()}`);
};

/* components */

function DashboardLayout() {
  const { user } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div>
      {/* persistent layout */}
      <header>
        <NavLink to="/">home</NavLink>
        <nav>
          {/* Prefetch on intent:
- preloads route data when user hovers/focuses
- improves perceived navigation speed
- should be used for common paths only */}
          <NavLink to="/products" prefetch="intent">
            Products
          </NavLink>
        </nav>
      </header>

      <main>
        {navigation.state === "loading" && <p>Loading...</p>}
        <h3>Welcome {user.name || "guest"}</h3>
        <Outlet />
      </main>
    </div>
  );
}

// route owns data (no fetching in components)
function ProductsPage() {
  const { products } = useLoaderData();

  return (
    <section>
      <h4>Products</h4>

      {/* progressive enhancement */}

      <Form method="post">
        <select name="category" defaultValue="">
          <option value="" disabled>
            select category
          </option>
          <option value="electronics">electronics</option>
          <option value="fashion">fashion</option>
        </select>

        <input type="number" name="price" placeholder="max price" />

        <button type="submit">Apply</button>
      </Form>

      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={p.id}>{p.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ProductDetails() {
  const { product, reviews } = useLoaderData();

  return (
    <section>
      <h4>{product.name}</h4>
      <p>{product.price}$</p>

      {/* deferred data */}
      <Suspense fallback={<p>Loading reviews...</p>}>
        <Await resolve={reviews}>
          {(data) => (
            <ul>
              {data.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </section>
  );
}

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
        /* lazy loading should happen here like this
        lazy: () => import("./ProductsPage")
        */
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

export default function App() {
  return <RouterProvider router={router} />;
}
