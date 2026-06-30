import { webhookCallback } from "grammy";
import { FastifyInstance } from "fastify";
import { TelegramClient } from "@telegram";
import { AppConfig } from "@config/app.config";
import { TelegramConfig } from "@config/telegram.config";

export default async function telegramRoute(fastify: FastifyInstance) {
  if (AppConfig.APP_ENV !== "production") return;

  const bot = TelegramClient.getBot();

  const handleUpdate = webhookCallback(bot, "fastify", {
    secretToken: TelegramConfig.TELEGRAM_WEBHOOK_SECRET,
  });

  fastify.post(
    "/webhook",
    {
      schema: {
        tags: ["Telegram"],
        summary: "Точка входа для Telegram webhook",
      },
    },
    handleUpdate,
  );
}
