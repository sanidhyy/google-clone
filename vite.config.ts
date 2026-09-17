import netlify from "@netlify/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  if (env.RAPID_API_KEY) {
    process.env.RAPID_API_KEY = env.RAPID_API_KEY;
  }

  return {
    plugins: [
      react(),
      tailwindcss(),
      netlify({
        edgeFunctions: { enabled: false },
      }),
    ],
  };
});
