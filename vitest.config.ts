import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test.setup.ts"],
    css: true,
    globals: true,
    coverage: { reporter: ["text", "lcov"] },
  },
  esbuild: {
    jsx: "automatic",          // ✅ utilise le runtime JSX moderne
    jsxImportSource: "react",  // (optionnel) explicite la source JSX
  },
});
