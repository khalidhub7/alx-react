import React, { Suspense } from "react";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const Loading = ({ children }) => (
  <Suspense
    fallback={<div style={{ padding: "1rem" }}>loading component ...</div>}
  >
    {children}
  </Suspense>
);

export { delay, Loading };
