import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  build: { manifest: true },
  base: import.meta.PROD === "production" ? "/static/" : undefined,
  // base: "/static/",
  plugins: [svelte()],
});
