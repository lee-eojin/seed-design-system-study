import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { seedDesignPlugin } from "@seed-design/vite-plugin";

export default defineConfig({
  plugins: [react(), seedDesignPlugin()],
  resolve: {
    alias: {
      "seed-design": "/seed-design",
    },
  },
});
