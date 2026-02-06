import { StrictMode } from "react";
import { Toaster } from "sonner"
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "../learn-space/chadcn-ui-learn/my-form";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
);
