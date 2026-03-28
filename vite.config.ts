import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Dev-only: when `VITE_API_BASE_URL` is empty (see `.env.development`), `/api` is proxied here.
// Production (Vercel): set `VITE_API_BASE_URL` in the Vercel dashboard, or add `/api` rewrites in `vercel.json`.
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
});
