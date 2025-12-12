import React from "react";
import { delay } from "./utils";

await delay(2000)
const HeavyAnalyticsPanelComp = ({ cartId }) => (
  <div
    style={{
      marginTop: "1rem",
      padding: "1rem",
      background: "#fff",
      borderRadius: "6px",
    }}
  >
    <p>[HeavyAnalyticsPanel with id {cartId}]</p>
  </div>
);

export default HeavyAnalyticsPanelComp;
