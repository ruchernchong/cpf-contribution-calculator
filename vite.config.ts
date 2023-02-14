import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import ViteRadar from "vite-plugin-radar";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteRadar({
      analytics: {
        id: "G-4W2DF7BF1S",
      },
    }),
  ],
});
