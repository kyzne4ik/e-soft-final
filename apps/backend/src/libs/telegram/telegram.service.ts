import { logger } from "@utils";
import { Api, GrammyError } from "grammy";
import { FastifyBaseLogger } from "fastify";
import { TelegramClient } from "./telegram.client";
import { ITelegramService } from "./telegram.types";

export class TelegramService implements ITelegramService {
  constructor(
    private api: Api,
    private logger: FastifyBaseLogger,
  ) {}

  async sendToTopic(
    chatId: number | string,
    threadId: number,
    text: string,
  ): Promise<void> {
    try {
      await this.api.sendMessage(chatId, text, {
        parse_mode: "HTML",
        message_thread_id: threadId,
      });
      this.logger.info(`[telegram] доставлено в чат ${chatId}`);
    } catch (e) {
      if (e instanceof GrammyError) {
        this.logger.warn(
          `[telegram] ${e.error_code} ${e.description} (chat ${chatId})`,
        );
      }
      throw e;
    }
  }

  async sendToUser(tgId: number | string, text: string): Promise<void> {
    try {
      await this.api.sendMessage(tgId, text, {
        parse_mode: "HTML",
      });
      this.logger.info(`[telegram] доставлено пользователю ${tgId}`);
    } catch (e) {
      if (e instanceof GrammyError) {
        this.logger.warn(
          `[telegram] ${e.error_code} ${e.description} (user ${tgId})`,
        );
      }
      throw e;
    }
  }
}

export const telegramService = new TelegramService(
  TelegramClient.getApi(),
  logger,
);
