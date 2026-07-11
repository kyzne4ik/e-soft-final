import { AppConfig, TelegramConfig } from "@config";
import { bullWorkers } from "@bull";
import { createAppInstance } from "./app";
import { Redis } from "@database";
import { db } from "@repo/database";
import { TelegramBot, TelegramClient } from "@telegram";
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

    if (AppConfig.APP_ENV === "production") {
      await TelegramClient.getApi().setWebhook(
        `${AppConfig.BACKEND_PUBLIC_URL}/api/telegram/webhook`,
        { secret_token: TelegramConfig.TELEGRAM_WEBHOOK_SECRET },
      );
    } else {
      void TelegramClient.getBot().start();
    }

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
