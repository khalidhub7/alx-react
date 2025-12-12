import React, { Suspense } from "react";
import { fallback } from "../../sharedStyles";

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const Loading = ({ children }) => (
  <Suspense fallback={<div style={fallback}>loading component ...</div>}>
    {children}
  </Suspense>
);

export { delay, Loading };
