import { Api, Bot } from "grammy";
import { HttpsProxyAgent } from "https-proxy-agent";
import { TelegramConfig } from "@config/telegram.config";

const apiOptions = TelegramConfig.TELEGRAM_PROXY_URL
  ? {
      baseFetchConfig: {
        agent: new HttpsProxyAgent(TelegramConfig.TELEGRAM_PROXY_URL),
      },
    }
  : {};

export class TelegramClient {
  private static bot: Bot | null = null;
  private static api: Api | null = null;

  static getBot(): Bot {
    if (!TelegramClient.bot)
      TelegramClient.bot = new Bot(TelegramConfig.TELEGRAM_BOT_TOKEN, {
        client: apiOptions,
      });
    return TelegramClient.bot;
  }

  static getApi(): Api {
    if (!TelegramClient.api)
      TelegramClient.api = new Api(
        TelegramConfig.TELEGRAM_BOT_TOKEN,
        apiOptions,
      );
    return TelegramClient.api;
  }

  static async destroyTelegramBot(): Promise<void> {
    if (this.bot) {
      await this.bot.stop();
      this.bot = null;
      this.api = null;
    }
  }
}
