// REACT ROUTER MASTERY "Level 3 practice"
// use only Level 3 learned concepts

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink, useParams, Outlet } from "react-router-dom";
import { page, layout, header, nav } from "./sharedStyles";
import { link, container, active } from "./sharedStyles";

// simple pages
const Home = () => <h4 style={page}>🏠 home</h4>;
const NotFound = () => <h4 style={page}>❌ not found</h4>;
const Products = () => <h4 style={page}>🛒 all Products</h4>;
const ProductDetails = () => {
  const { productId } = useParams();
  return <h4 style={page}>product id: {productId}</h4>;
};
// a slug is a human-readable part of a url
// like /products/3/nike-shoes  slug: nike-shoes
const ProductSlug = () => {
  const { slug, productId } = useParams();
  return (
    <div style={page}>
      <h4>product id: {productId}</h4>
      <h4>product slug: {slug}</h4>
    </div>
  );
};

// multiple dynamic segments
// url ex: "/orders/2/items/7"
const OrderItem = () => {
  const { orderId, itemId } = useParams();
  return (
    <div style={page}>
      <h4>order id: {orderId}</h4>
      <h4>item id: {itemId}</h4>
    </div>
  );
};

// optional param (category may exist or not)
// ex: /shop/laptops
const Shop = () => {
  const { category } = useParams();
  return (
    <h4 style={page}>
      {category ? `category: ${category}` : "no category selected"}
    </h4>
  );
};

// splat route (catch-all docs)
// ex:"/docs/react/router/v6", "/docs/installation"
// return the full "path after /docs/"
const Docs = () => {
  const { "*": rest } = useParams();
  return <h4 style={page}>current doc: {rest ? rest : "default"}</h4>;
};

// layout
const Layout = () => (
  <div style={layout}>
    <header style={header}>
      <nav style={nav}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          home
        </NavLink>

        <NavLink
          end
          to="/products"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          products
        </NavLink>

        <NavLink
          end
          to="/products/3"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          top product
        </NavLink>

        <NavLink
          end
          to="/products/3/nike-shoes"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          top product slug
        </NavLink>

        <NavLink
          end
          to="/orders/2/items/7"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          order item test
        </NavLink>

        <NavLink
          end
          to="/shop"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          shop
        </NavLink>

        <NavLink
          end
          to="/shop/laptops"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          {"shop < category >"}
        </NavLink>

        <NavLink
          end
          to="/docs/installation"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          docs
        </NavLink>
      </nav>
    </header>

    <div style={container}>
      <Outlet />
    </div>
  </div>
);

// entry point
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* products */}
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:productId" element={<ProductDetails />} />
          <Route path="products/:productId/:slug" element={<ProductSlug />} />

          {/* orders */}
          <Route path="orders/:orderId/items/:itemId" element={<OrderItem />} />

          {/* shop */}
          <Route path="shop/:category?" element={<Shop />} />

          {/* docs */}
          <Route path="docs/*" element={<Docs />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
