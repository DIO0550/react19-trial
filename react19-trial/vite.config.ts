import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
// import React from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
  server: {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "content-language": "ja-jp",
    },
  },
});
