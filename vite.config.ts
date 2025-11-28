import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.js",

    server: {
      deps: {
        inline: ["@mui/x-data-grid"],
      },
      coverage: {
        provider: "v8",
        enabled: true,
        reporter: ["text", "html", "json"], // or 'istanbul'
      },
    },
  },
} as UserConfig);
