import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  // build: { manifest: true },
  // base: process.env.PROD ? "/static/" : undefined,
  plugins: [svelte()],
  server: {
    host: "0.0.0.0",
    strictPort: true,
    port: 5173,
  },
});
