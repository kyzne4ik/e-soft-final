import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../src/db/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  try {
    console.log("🌱 Начинаю наполнение БД...");

    // Пример: добавляем тестовых пользователей
    await db.insert(schema.users).values([
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
      },
    ]);

    console.log("✓ БД успешно заполнена");
  } catch (error) {
    console.error("✗ Ошибка при заполнении БД:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
