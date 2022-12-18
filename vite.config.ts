import { fileURLToPath, URL } from "node:url";
import dotenv from "dotenv";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

dotenv.config();
let exportDefault = {};
if (process.env.BUILD_MODE === "VERCEL") {
  exportDefault = {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
} else {
  exportDefault = {
    build: {
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
    },
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
}
// https://vitejs.dev/config/
export default defineConfig(exportDefault);
