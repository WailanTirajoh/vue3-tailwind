import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

let build = {
  cssCodeSplit: false,
  lib: {
    entry: "./src/build.ts",
    formats: ["es", "cjs"],
    name: "Vue3Tailwind",
    fileName: "vue3-tailwind",
  },
  rollupOptions: {
    external: ["vue"],
    output: {
      globals: {
        vue: "Vue",
      },
    },
  },
};
if (process.env.BUILD_MODE === "VERCEL") {
  build = {};
}
// https://vitejs.dev/config/
export default defineConfig({
  build: build,
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
