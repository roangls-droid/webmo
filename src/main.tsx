import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

/** Sur localhost, un ancien service worker peut servir un bundle figé (dev ou `vite preview`). */
const isLocalHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost");
if (isLocalHost && "serviceWorker" in navigator) {
  void navigator.serviceWorker.getRegistrations().then((regs) => {
    for (const r of regs) void r.unregister();
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

