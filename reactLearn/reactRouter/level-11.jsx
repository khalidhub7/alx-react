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

import React, { Suspense, useEffect } from "react";
import {
  createBrowserRouter,
  NavLink,
  RouterProvider,
  useActionData,
} from "react-router-dom";
import { useSearchParams, useLoaderData, Outlet } from "react-router-dom";
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

const dashboardLoader = () => ({ user: DB.user });

const productsLoader = async ({ request }) => {
  const url = new URL(request.url);
  const { category, price } = Object.fromEntries(url.searchParams.entries());

  const products = await DB.products.filter(
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
  const { category, price } = Object.fromEntries(fd);
  return { ...(category && { category }), ...(price && { price }) };
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
          {/* load the route en intent */}
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

function ProductsPage() {
  const { products } = useLoaderData();
  const actionData = useActionData() || {};
  const { category, price } = actionData;
  const [_, setParams] = useSearchParams();

  useEffect(
    () =>
      setParams((prev) => {
        prev.set("category", category);
        prev.set("price", price);
        return prev;
      }),
    [category, price],
  );

  return (
    <section>
      <h4>Products</h4>

      {/* progressive enhancement */}

      <Form method="post">
        <select name="category">
          <option disabled selected>
            select category
          </option>
          <option value="electronics">electronics</option>
          <option value="fashion">fashion</option>
        </select>
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
