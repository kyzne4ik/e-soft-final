import { TelegramConfig } from "@config/telegram.config";
import { TelegramClient } from "./telegram.client";
import { AppConfig } from "@config/app.config";
import { logger } from "@utils/logger";

export class TelegramWebhook {
  constructor() {}

  async registerWebhook(): Promise<void> {
    if (AppConfig.APP_ENV === "production") {
      try {
        await TelegramClient.getApi().setWebhook(
          `${AppConfig.BACKEND_PUBLIC_URL}/api/telegram/webhook`,
          { secret_token: TelegramConfig.TELEGRAM_WEBHOOK_SECRET },
        );
      } catch (err) {
        logger.error(
          { err },
          "Не удалось установить telegram webhook — продолжаем без него",
        );
      }
    } else {
      void TelegramClient.getBot().start();
    }
  }
}
