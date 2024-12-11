import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { worker } from "./mocks/worker.ts";
import App from "./App.tsx";

worker.start().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
);
