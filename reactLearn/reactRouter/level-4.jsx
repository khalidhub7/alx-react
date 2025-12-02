// REACT ROUTER MASTERY — "level 4 practice"
// use only Level 4 learned concepts
// (layouts, nested routes, outlet, index, tabs)

import React from "react";
import { BrowserRouter, Routes, useParams } from "react-router-dom";
import { Route, NavLink, Outlet } from "react-router-dom";
import { nav, container, link, active } from "./sharedStyles";
import { page, layout, header } from "./sharedStyles";

// simple pages
const Home = () => <h4 style={page}>🏠 home</h4>;
const NotFound = () => <h4 style={page}>❌ not found</h4>;

// main layout (top layout)
const MainLayout = () => (
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
          to="/shop"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          shop
        </NavLink>

        <NavLink
          to="/account"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          account
        </NavLink>

        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
        >
          dashboard
        </NavLink>
      </nav>
    </header>

    <div style={container}>
      <Outlet />
    </div>
  </div>
);

// shop pages
const ShopLayout = () => {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <aside style={{ width: 200 }}>
        <h4>categories</h4>
        <NavLink to="/shop/products" end>
          all products
        </NavLink>
        <br />
        <NavLink to="/shop/products/electronics">electronics</NavLink>
        <br />
        <NavLink to="/shop/products/clothes">clothes</NavLink>
        <br />
        <NavLink to="/shop/products/sports">sports</NavLink>
        <br />
      </aside>

      <section style={{ flex: 1 }}>
        <Outlet />
      </section>
    </div>
  );
};
const Products = () => <h4 style={page}>🛒 all Products</h4>;
const Category = () => {
  const { category } = useParams();
  return (
    <h4 style={page}>🔎 category products {category || "all"}</h4>
  );
};

// account pages
const AccountLayout = () => (
  <div>
    <nav style={{ marginBottom: 20 }}>
      <NavLink to="/account">profile</NavLink>
      <NavLink to="/account/orders">orders</NavLink>
      <NavLink to="/account/settings">settings</NavLink>
    </nav>

    <Outlet />
  </div>
);

const AccountProfile = () => <h4 style={page}>👤 profile</h4>;
const AccountOrders = () => <h4 style={page}>📦 orders</h4>;
const AccountSettings = () => <h4 style={page}>⚙️ settings</h4>;

// dashboard pages
const DashboardLayout = () => (
  <div style={{ display: "flex" }}>
    <aside style={{ width: 180 }}>
      <h4>dashboard</h4>
      <NavLink to="/dashboard">overview</NavLink>
      <NavLink to="/dashboard/products">products</NavLink>
      <NavLink to="/dashboard/stats">stats</NavLink>
    </aside>

    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
  </div>
);
const DashboardOverview = () => <h4 style={page}>📊 overview</h4>;
const DashboardProducts = () => (
  <h4 style={page}>📦 manage products</h4>
);
const DashboardStats = () => <h4 style={page}>📈 stats</h4>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          {/* shop */}
          <Route path="shop" element={<ShopLayout />}>
            <Route path="products" element={<Products />} />
            <Route path="products/:category" element={<Category />} />
          </Route>
          {/* account */}
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountProfile />} />
            <Route path="orders" element={<AccountOrders />} />
            <Route path="settings" element={<AccountSettings />} />
          </Route>
          {/* dashboard */}
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="stats" element={<DashboardStats />} />
          </Route>
          {/* NOT FOUND */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
