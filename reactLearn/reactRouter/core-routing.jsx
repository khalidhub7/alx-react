// REACT ROUTER MASTERY "Level 1 practice"
// use only Level 1 learned concepts
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

const pageStyle = {
  padding: "1.5rem",
  background: "#fafafa",
  border: "1px solid #ddd",
  margin: "1rem",
  borderRadius: "6px",
};

const Home = () => <h4 style={pageStyle}>home page</h4>;
const Products = () => <h4 style={pageStyle}>our products</h4>;
const ProductDetails = () => (
  <h4 style={pageStyle}>single product details</h4>
);
const Cart = () => <h4 style={pageStyle}>your cart</h4>;
const About = () => <h4 style={pageStyle}>about us</h4>;

const Layout = () => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <header
        style={{
          background: "#fff",
          padding: "1rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          marginBottom: "1rem",
        }}
      >
        <nav
          style={{
            display: "flex",
            gap: "1.5rem",
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "#333" }}
            to="/"
          >
            home
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#333" }}
            to="/products"
          >
            products
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#333" }}
            to="/cart"
          >
            cart
          </Link>
          <Link
            style={{ textDecoration: "none", color: "#333" }}
            to="/about"
          >
            about
          </Link>
        </nav>
      </header>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
