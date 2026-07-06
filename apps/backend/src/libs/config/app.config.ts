import "dotenv/config";
import { str, cleanEnv, num, url } from "envalid";

export const AppConfig = cleanEnv(process.env, {
  APP_NAME: str({ default: "esoft-final" }),
  APP_ENV: str({
    choices: ["development", "staging", "production"],
    default: "development",
  }),
  LOG_LEVEL: str({
    choices: ["info", "warn", "debug"],
    default: "info",
  }),
  APP_TIMEZONE: str({
    default: "UTC",
  }),
  BACKEND_PORT: num({ default: 3000 }),
  BACKEND_HOST: str({ default: "localhost" }),
  BACKEND_URL: url({ default: "http://localhost:3000" }),
  BACKEND_PUBLIC_URL: url({ default: "http://localhost:3000" }),
  BACKEND_JWT_SECRET: str({ default: "jwt-secret" }),
  BACKEND_JWT_EXPIRES_IN: num({ default: 3600 }),
  BACKEND_JWT_REFRESH_SECRET: str({ default: "jwt-refresh-secret" }),
  BACKEND_JWT_REFRESH_EXPIRES_IN: num({ default: 604800 }),
  VITE_URL: url({ default: "http://localhost:3000" }),
});
