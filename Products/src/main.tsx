import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>       {/* bật chế độ điều hướng cho toàn bộ app */}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
