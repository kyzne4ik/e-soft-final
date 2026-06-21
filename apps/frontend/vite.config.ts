import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const port = parseInt(env.VITE_PORT || "3001");

  return {
    plugins: [react()],
    assetsInclude: ["**/*.svg", "**/*.csv"],
    server: {
      host: true,
      port,
    },
  };
});
