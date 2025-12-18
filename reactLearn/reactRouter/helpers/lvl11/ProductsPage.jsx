import { useLoaderData } from "react-router-dom";
import { productList, productCard, productTitleText } from "../../sharedStyles";

const ProductsPage = () => {
  const { products } = useLoaderData();

  return (
    <ul style={productList}>
      {products.map((p) => (
        <li key={p.id} style={productCard}>
          <p style={productTitleText}>{p.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default ProductsPage;
