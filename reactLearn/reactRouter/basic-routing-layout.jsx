// REACT ROUTER MASTERY "Level 1 practice"
// use only Level 1 learned concepts

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, Outlet } from "react-router-dom";
import { page, layout, header } from "./sharedStyles";
import { nav, link, container } from "./sharedStyles";

// simple pages
const Home = () => <h4 style={page}>home page</h4>;
const Products = () => <h4 style={page}>our products</h4>;
const ProductDetails = () => <h4 style={page}>single product details</h4>;
const Cart = () => <h4 style={page}>your cart</h4>;
const About = () => <h4 style={page}>about us</h4>;

// global layout
const Layout = () => (
  <div style={layout}>
    <header style={header}>
      <nav style={nav}>
        <Link style={link} to="/">
          home
        </Link>
        <Link style={link} to="/products">
          products
        </Link>
        <Link style={link} to="/cart">
          cart
        </Link>
        <Link style={link} to="/about">
          about
        </Link>
      </nav>
    </header>

    <div style={container}>
      <Outlet />
    </div>
  </div>
);
// entry point
const App = () => (
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

export default App;
