import "dotenv/config";
import { cleanEnv, str } from "envalid";

export const TelegramConfig = cleanEnv(process.env, {
  TELEGRAM_BOT_TOKEN: str({ default: "" }),
  TELEGRAM_WEBHOOK_SECRET: str({ default: "" }),
  TELEGRAM_PROXY_URL: str({ default: "" }),
});
