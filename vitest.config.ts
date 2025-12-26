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
      exclude: [
        "src/**/*.d.ts",
        "src/components/ui/**",
        "src/app/robots.ts",
        "src/app/sitemap.ts",
        "src/app/error.tsx",
        "src/app/not-found.tsx",
        "src/app/providers.tsx",
        "src/app/**/layout.tsx",
        "**/\\(docs\\)/**",
        "src/proxy.ts",
        "src/types/**",
      ],
      thresholds: {
        autoUpdate: (threshold) => Math.floor(threshold / 5) * 5,
        statements: 45,
        branches: 55,
        functions: 25,
        lines: 45,
      },
    },
  },
});