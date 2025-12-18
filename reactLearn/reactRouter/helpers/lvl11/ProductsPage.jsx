import { useLoaderData, useSearchParams } from "react-router-dom";

const ProductsPage = () => {
  const { products } = useLoaderData();
  const [params, setParams] = useSearchParams();

  return (
    <>
      <button onClick={() => setParams({ category: "electronics" })}>
        electronics
      </button>
      <button onClick={() => setParams({ category: "fashion" })}>
        fashion
      </button>

      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </>
  );
};
