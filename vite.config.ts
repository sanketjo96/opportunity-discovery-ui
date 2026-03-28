import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During dev, `/api` is proxied so requests to `/api/opportunities` reach your backend.
// Change `target` to match your API server (see https://vitejs.dev/config/server-options.html#server-proxy).
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});
