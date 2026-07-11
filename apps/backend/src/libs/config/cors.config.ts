import "dotenv/config";
import { bool, cleanEnv, num, str } from "envalid";

export const CorsConfig = cleanEnv(process.env, {
  CORS_ORIGIN: str({ default: "*" }),
  CORS_METHODS: str({ default: "GET,HEAD,PUT,PATCH,POST,DELETE" }),
  CORS_ALLOWED_HEADERS: str({ default: "Content-Type, Authorization" }),
  CORS_EXPOSED_HEADERS: str({ default: "" }),
  CORS_MAX_AGE: num({ default: 86400 }),
  CORS_CREDENTIALS: bool({ default: false }),
});
