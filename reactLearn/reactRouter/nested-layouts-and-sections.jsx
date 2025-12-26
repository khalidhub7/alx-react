// REACT ROUTER MASTERY — "level 4 practice"
// use only Level 4 learned concepts

import React from "react";
import { BrowserRouter, Routes, useParams } from "react-router-dom";
import { Route, NavLink, Outlet } from "react-router-dom";
import { accountTabActive, sideLinkActive } from "./sharedStyles";
import { dashboardAside, accountTab, sideLink } from "./sharedStyles";
import { nav, container, link, active, aside } from "./sharedStyles";
import { page, layout, header } from "./sharedStyles";

// simple pages
const Home = () => <h4 style={page}>🏠 home</h4>;
const NotFound = () => <h4 style={page}>❌ not found</h4>;

// main layout
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

// shop layout
const ShopLayout = () => {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <aside style={aside}>
        <h4>categories</h4>
        <NavLink
          to="products"
          end
          style={({ isActive }) => ({
            ...sideLink,
            ...sideLinkActive(isActive),
          })}
        >
          all products
        </NavLink>

        <NavLink
          to="products/electronics"
          style={({ isActive }) => ({
            ...sideLink,
            ...sideLinkActive(isActive),
          })}
        >
          electronics
        </NavLink>

        <NavLink
          to="products/clothes"
          style={({ isActive }) => ({
            ...sideLink,
            ...sideLinkActive(isActive),
          })}
        >
          clothes
        </NavLink>

        <NavLink
          to="products/sports"
          style={({ isActive }) => ({
            ...sideLink,
            ...sideLinkActive(isActive),
          })}
        >
          sports
        </NavLink>
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
  return <h4 style={page}>🔎 category products {category || "all"}</h4>;
};

// account layout
const AccountLayout = () => (
  <div>
    <nav style={{ marginBottom: 20, display: "flex", gap: "1rem" }}>
      <NavLink
        to=""
        end
        style={({ isActive }) => ({
          ...accountTab,
          ...accountTabActive(isActive),
        })}
      >
        profile
      </NavLink>

      <NavLink
        to="orders"
        style={({ isActive }) => ({
          ...accountTab,
          ...accountTabActive(isActive),
        })}
      >
        orders
      </NavLink>

      <NavLink
        to="settings"
        style={({ isActive }) => ({
          ...accountTab,
          ...accountTabActive(isActive),
        })}
      >
        settings
      </NavLink>
    </nav>

    <Outlet />
  </div>
);

const AccountProfile = () => <h4 style={page}>👤 profile</h4>;
const AccountOrders = () => <h4 style={page}>📦 orders</h4>;
const AccountSettings = () => <h4 style={page}>⚙️ settings</h4>;

// dashboard layout
const DashboardLayout = () => (
  <div style={{ display: "flex" }}>
    <aside style={dashboardAside}>
      <h4>dashboard</h4>
      <NavLink
        to=""
        end
        style={({ isActive }) => ({
          ...sideLink,
          ...sideLinkActive(isActive),
        })}
      >
        overview
      </NavLink>

      <NavLink
        to="products"
        style={({ isActive }) => ({
          ...sideLink,
          ...sideLinkActive(isActive),
        })}
      >
        products
      </NavLink>

      <NavLink
        to="stats"
        style={({ isActive }) => ({
          ...sideLink,
          ...sideLinkActive(isActive),
        })}
      >
        stats
      </NavLink>
    </aside>

    <main style={{ flex: 1 }}>
      <Outlet />
    </main>
  </div>
);

const DashboardOverview = () => <h4 style={page}>📊 overview</h4>;
const DashboardProducts = () => <h4 style={page}>📦 manage products</h4>;
const DashboardStats = () => <h4 style={page}>📈 stats</h4>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />

          {/* shop */}
          <Route path="shop" element={<ShopLayout />}>
            <Route index element={<Products />} />
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
