import { page } from "../../sharedStyles";
import React from "react";
import { delay } from "./utils";

await delay(2000);
const Home = () => (
  <div style={page}>
    <h2>🏠 Home Page</h2>
    <p>Welcome to the Level 8 practice demo.</p>
  </div>
);

export default Home;
