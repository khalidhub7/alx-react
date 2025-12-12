import React from "react";
import { delay } from "./utils";
import { page, btn, productList } from "../../sharedStyles";
import { useLoaderData, useNavigate } from "react-router-dom";
import { productCard, productTitleText } from "../../sharedStyles";

await delay(1000);

const ProductsPage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h3>🛍️ products list</h3>

      <ul style={productList}>
        {data.map((c) => (
          <li key={c.id} style={productCard}>
            <p style={productTitleText}>
              {c.model} — <strong>${c.price}</strong>
            </p>

            <button style={btn} onClick={() => navigate(c.id)}>
              discover the car
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
