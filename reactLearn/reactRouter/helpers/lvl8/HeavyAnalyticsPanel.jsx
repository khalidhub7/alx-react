import React from "react";
import { delay } from "./utils";
import { heavyPanel } from "../../sharedStyles";

await delay(2000);

const HeavyAnalyticsPanelComp = ({ cartId }) => (
  <div style={heavyPanel}>
    <p>[HeavyAnalyticsPanel with id {cartId}]</p>
  </div>
);

export default HeavyAnalyticsPanelComp;
