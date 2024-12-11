import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
// import React from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [reactRouter()],
});
