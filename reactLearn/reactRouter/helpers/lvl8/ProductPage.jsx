import React, { useState, lazy, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { page, btn } from "../../sharedStyles";
import { Loading } from "./utils";
import { delay } from "./utils";

await delay(2000)

const ProductPage = () => {
  const p = useLoaderData();
  const [show, setShow] = useState(false);
  const isHeavyUiLoadedBefore = useRef(false);
  const firstRender = useRef(true);
  const [HeavyAnalyticsPanel, setHeavyAnalyticsPanel] = useState(undefined);

  useEffect(() => {
    if (firstRender.current) {
      // to prevent first render
      firstRender.current = false;
      return;
    }
    if (isHeavyUiLoadedBefore.current) return;

    // micro-split lazy loading (heavy component loads only when needed)
    console.log("micro-split lazy loading ...");
    setHeavyAnalyticsPanel(lazy(() => import("./HeavyAnalyticsPanel")));
    isHeavyUiLoadedBefore.current = true;
  }, [show]);

  return (
    <div style={page}>
      <h3>{p.model}</h3>
      <p>
        <strong>Price:</strong> ${p.price}
      </p>

      {p.heavy ? (
        <div style={{ marginTop: "1rem" }}>
          <p>This product has a heavy UI preview</p>

          <button style={btn} onClick={() => setShow((prev) => !prev)}>
            {show ? "hide" : "show"} heavy ui
          </button>

          {show && HeavyAnalyticsPanel ? (
            <Loading>
              <HeavyAnalyticsPanel cartId={p.id} />
            </Loading>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ProductPage;
