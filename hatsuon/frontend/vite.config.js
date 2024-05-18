import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  build: { manifest: true },
  // TODO: Production build path
  // base: "/static/",
  plugins: [svelte()],
});
