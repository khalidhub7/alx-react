import ReactDOM from "react-dom/client";
import favicon from "./favicon.ico";
import App from "./App";
import "./index.css";

const link = document.createElement("link");
link.rel = "icon";
link.href = favicon;
document.head.appendChild(link);

ReactDOM.createRoot(
  document.getElementById("root"),
).render(<App />);
