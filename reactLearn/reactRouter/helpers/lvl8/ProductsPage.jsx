import { useLoaderData, useNavigate } from "react-router-dom";
import { page, btn } from "../../sharedStyles";
import React from "react";
import { delay } from "./utils";

await delay(2000)
const ProductsPage = () => {
  const data = useLoaderData();
  /* console.log(data); */
  const navigate = useNavigate();

  return (
    <div style={page}>
      <h3>🛍️ Products List</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {data.map((c) => (
          <li
            key={c.id}
            style={{
              background: "#fff",
              padding: "1rem",
              borderRadius: "6px",
              marginBottom: "1rem",
              border: "1px solid #ddd",
            }}
          >
            <p style={{ margin: 0, fontSize: "1.1rem" }}>
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
