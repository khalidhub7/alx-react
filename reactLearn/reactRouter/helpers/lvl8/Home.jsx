import React from "react";
import { delay } from "./utils";
import { page } from "../../sharedStyles";

await delay(1000);
const Home = () => (
  <div style={page}>
    <h2>🏠 Home Page</h2>
    <p>Level 8 practice</p>
  </div>
);

export default Home;
