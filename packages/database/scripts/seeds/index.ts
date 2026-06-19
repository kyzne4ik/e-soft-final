import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../../src/db/core";
import { reset } from "drizzle-seed";
import { seedAcademicActivity } from "./academic-activity.seed";
import { seedContent } from "./content.seed";
import { seedCore } from "./core.seed";
import { seedInfra } from "./infra.seed";
import { Config } from "../../config";

const pool = new Pool({
  connectionString: Config.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
  await reset(db, schema);

  try {
    console.log("🌱 Начинаю наполнение БД...");

    const { mentorProfiles, studentProfiles } = await seedCore();
    const { activeStream, finishedStream } = await seedContent();

    await seedAcademicActivity(
      mentorProfiles,
      studentProfiles,
      activeStream,
      finishedStream,
    );

    await seedInfra();

    console.log("✓ БД успешно заполнена");
  } catch (error) {
    console.error("✗ Ошибка при заполнении БД:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
