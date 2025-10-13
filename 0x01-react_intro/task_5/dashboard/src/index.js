import "./index.css";
import App from "./App/App";
import React from "react";
import favicon from "./assets/favicon.ico";
import Notifications from "./Notifications/Notifications";
import ReactDOM from "react-dom/client";

const link = document.createElement("link");
link.rel = "icon";
link.href = favicon;
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

ReactDOM.createRoot(
  document.getElementById("root-notifications"),
).render(
  <React.StrictMode>
    <Notifications />
  </React.StrictMode>,
);
