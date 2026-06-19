import { defineConfig } from "drizzle-kit";
import { Config } from "./config";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: Config.DATABASE_URL,
  },
});
