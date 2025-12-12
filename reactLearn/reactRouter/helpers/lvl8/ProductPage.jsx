import { delay } from "./utils";
import { Loading } from "./utils";
import { useLoaderData } from "react-router-dom";
import { page, btn, heavyContainer } from "../../sharedStyles";
import React, { useState, lazy, useRef, useEffect } from "react";

/* await delay(1000); */

const ProductPage = () => {
  const p = useLoaderData();
  const [show, setShow] = useState(false);
  const isHeavyUiLoadedBefore = useRef(false);
  const firstRender = useRef(true);
  const [HeavyAnalyticsPanel, setHeavyAnalyticsPanel] = useState(undefined);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (isHeavyUiLoadedBefore.current) return;

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
        <div style={heavyContainer}>
          <p>this product has a heavy UI preview</p>

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
