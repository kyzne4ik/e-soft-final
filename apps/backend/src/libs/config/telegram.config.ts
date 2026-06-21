import "dotenv/config";
import { cleanEnv, str } from "envalid";

export const TelegramConfig = cleanEnv(process.env, {
  TELEGRAM_BOT_TOKEN: str({ default: "" }),
});
