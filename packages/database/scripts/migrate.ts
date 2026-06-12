import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("✓ Миграции успешно применены");
  } catch (error) {
    console.error("✗ Ошибка при выполнении миграций:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
