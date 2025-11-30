// REACT ROUTER MASTERY "Level 2 practice"
// use only Level 2 learned concepts

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
  Outlet,
} from "react-router-dom";

import {
  page,
  layout,
  header,
  nav,
  link,
  container,
  btn,
  active,
} from "./sharedStyles";

const Home = () => <h4 style={page}>home page</h4>;
const Products = () => <h4 style={page}>our products</h4>;
const ProductDetails = () => (
  <h4 style={page}>single product details</h4>
);
const Cart = () => <h4 style={page}>your cart</h4>;
const NotFound = () => <h4 style={page}>404 - page not found</h4>;

const Layout = () => (
  <div style={layout}>
    <header style={header}>
      <nav style={nav}>
        <NavLink
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
          to="/"
          end
        >
          home
        </NavLink>
        <NavLink
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
          to="/products"
        >
          products
        </NavLink>
        <NavLink
          style={({ isActive }) => ({ ...link, ...active(isActive) })}
          to="/cart"
        >
          cart
        </NavLink>
      </nav>
    </header>

    <div style={container}>
      <Outlet />
    </div>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  return (
    <button style={btn} onClick={() => navigate("/products")}>
      continue as a guest
    </button>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <>
              <Home />
              <Login />
            </>
          }
        />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
