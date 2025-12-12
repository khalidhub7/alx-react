import { Outlet } from "react-router-dom";
import { delay } from "./utils";
import React from "react";

const ProductsLayout = () => (
  <div style={{ padding: "1rem" }}>
    <h2>📦 Products</h2>
    <Outlet />
  </div>
);

export default ProductsLayout;
