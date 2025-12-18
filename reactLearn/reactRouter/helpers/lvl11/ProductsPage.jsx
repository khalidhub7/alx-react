import { useLoaderData } from "react-router-dom";

const ProductsPage = () => {
  const { products } = useLoaderData();

  return (
    <div>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
