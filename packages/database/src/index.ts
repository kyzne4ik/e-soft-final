import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./db/core";
import { Config } from "../config";

const pool = new Pool({
  connectionString: Config.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export const checkDatabaseConnection = async () => {
  await pool.query("SELECT 1");
};

type DatabaseType = typeof db;

export type { DatabaseType };

export * from "./db/";
export { schema };

export * from "./pg-errors";
