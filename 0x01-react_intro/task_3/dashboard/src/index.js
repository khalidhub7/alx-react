import "./index.css";
import App from "./App";
import favicon from "./favicon.ico";
import Notifications from "./Notifications";
import ReactDOM from "react-dom/client";

const link = document.createElement("link");
link.rel = "icon";
link.href = favicon;
document.head.appendChild(link);

ReactDOM.createRoot(
  document.getElementById("root"),
).render(<App />);

ReactDOM.createRoot(
  document.getElementById("root-notifications"),
).render(<Notifications />);
