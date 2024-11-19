/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import glsl from "vite-plugin-glsl";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@themes": path.resolve(__dirname, "./src/themes"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@locales": path.resolve(__dirname, "./src/locales"),
      "@": path.resolve(__dirname, "./src/"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.ts",
    // https://github.com/wobsoriano/vitest-canvas-mock
    deps: {
      optimizer: {
        web: {
          include: ["vitest-canvas-mock"],
        },
      },
    },
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
  },
});
