import { Redis } from "@database";
import { AppConfig } from "@config";
import { db } from "@repo/database";
import { bullWorkers } from "@bull";
import { createAppInstance } from "./app";
import { TelegramBot, TelegramClient } from "@telegram";
import { TelegramWebhook } from "@telegram/telegram.webhook";
import { UserRepository } from "@modules/user/user.repository";
import { ProfileService } from "@modules/profile/profile.service";
import { UserTelegramStore } from "@modules/profile/user-telegram/user-telegram.store";
import { UserTelegramRepository } from "@modules/profile/user-telegram/user-telegram.repository";

const app = createAppInstance();

const start = async () => {
  try {
    await app.listen({
      port: AppConfig.BACKEND_PORT,
      host: "0.0.0.0",
    });

    bullWorkers.startWorkers();

    const telegramBot = new TelegramBot(
      new ProfileService(
        new UserTelegramStore(Redis.getInstance()),
        new UserTelegramRepository(db),
        new UserRepository(db),
      ),
    );
    telegramBot.registerBotHandlers();

    const telegramWebhook = new TelegramWebhook();
    telegramWebhook.registerWebhook();

    console.log(`Server listening on port ${AppConfig.BACKEND_PORT}`);
    app.log.info(`Server listening on port ${AppConfig.BACKEND_PORT}`);
  } catch (err) {
    console.log(err);
    app.log.error(err);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}, closing server gracefully...`);
  app.log.error(`Received ${signal}, closing server gracefully...`);

  try {
    await app.close();
    bullWorkers.stopWorkers();
    await TelegramClient.destroyTelegramBot();
    console.log("Server closed successfully");
    app.log.info("Server closed successfully");
    process.exit(0);
  } catch {
    console.log("Error during shutdown. Forcing exit.");
    app.log.error("Error during shutdown. Forcing exit.");
    process.exit(1);
  }
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception", err);
  app.log.error({ err }, "Uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled rejection", reason);
  app.log.error({ reason }, "Unhandled rejection");
  process.exit(1);
});

start();
