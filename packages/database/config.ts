import "dotenv/config";
import { cleanEnv, num, str } from "envalid";

export const Config = cleanEnv(process.env, {
  DATABASE_URL: str({
    default: "postgresql://postgres:postgres@localhost:5432/esoft_learn",
  }),
  DB_POOL_MIN: num({ default: 2 }),
  DB_POOL_MAX: num({ default: 10 }),
  DB_IDLE_TIMEOUT: num({ default: 30000 }),
  DB_CONNECTION_TIMEOUT: num({ default: 5000 }),
});
