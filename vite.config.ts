import { fileURLToPath, URL } from "node:url";
import type { Connect } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/** Réduit les réponses dev servies depuis le cache disque du navigateur (modules /src, /@vite, etc.). */
function devNoCachePlugin() {
  return {
    name: "dev-no-store-headers",
    configureServer(server: { middlewares: Connect.Server }) {
      return () => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
          res.setHeader("Pragma", "no-cache");
          next();
        });
      };
    },
  };
}

export default defineConfig({
  plugins: [react(), devNoCachePlugin()],
  server: {
    port: 5205,
    strictPort: true,
    host: "127.0.0.1",
    open: "/#portfolio",
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

