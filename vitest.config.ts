import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e"],
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      enabled: true,
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.{js,jsx,ts,tsx}"],
      exclude: ["src/**/*.d.ts", "src/middleware.ts", "src/components/ui/**"],
      thresholds: {
        autoUpdate: (threshold) => Math.floor(threshold / 5) * 5,
        statements: 25,
        branches: 30,
        functions: 15,
        lines: 25,
      },
    },
  },
});