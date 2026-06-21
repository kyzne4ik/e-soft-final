import { AppConfig } from "@config";
import { createAppInstance } from "./app";

const app = createAppInstance();

const start = async () => {
  try {
    app.listen({
      port: AppConfig.BACKEND_PORT,
      host: "0.0.0.0",
    });
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
