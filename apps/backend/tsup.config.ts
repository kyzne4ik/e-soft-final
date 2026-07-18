import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["esm"],
  target: "node22",
  outDir: "dist",
  clean: true,
  splitting: true,
  noExternal: ["@repo/schemas", "@repo/database"],
  sourcemap: true,
});
