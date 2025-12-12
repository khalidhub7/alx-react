import React from "react";
import { Outlet } from "react-router-dom";
import { productsLayoutWrapper } from "../../sharedStyles";

const ProductsLayout = () => (
  <div style={productsLayoutWrapper}>
    <h2>📦 Products</h2>
    <Outlet />
  </div>
);

export default ProductsLayout;
