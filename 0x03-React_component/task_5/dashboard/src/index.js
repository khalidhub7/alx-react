import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import favicon from "./assets/favicon.ico";

const link = document.createElement("link");
link.rel = "icon";
link.href = favicon;
document.head.appendChild(link);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root"),
);
