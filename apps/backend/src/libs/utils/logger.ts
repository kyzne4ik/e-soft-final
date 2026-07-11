import { AppConfig } from "@config/app.config";
import { pino, LoggerOptions as PinoLoggerOptions } from "pino";

interface LoggerOptions {
  level?: string;
  destination?: string;
  sensitiveKeys?: string[];
}

export const createLogger = (
  options: LoggerOptions = {},
): PinoLoggerOptions => {
  const { level = "info", destination = "./storage/logs/app.log" } = options;
  const isDev = AppConfig.APP_ENV === "development";

  return {
    level,
    transport: isDev
      ? {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
            ignore: "pid,hostname",
            singleLine: false,
            destination,
            mkdir: true,
          },
        }
      : {
          target: "pino/file",
          options: { destination, mkdir: true },
        },
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
    redact: {
      paths: [
        "*.password",
        "*.token",
        "*.accessToken",
        "*.refreshToken",
        "*.secret",
        "*.apiKey",
        "*.creditCard",
        "*.ssn",
        "*.pin",
        "req.headers.authorization",
        "req.headers.cookie",
      ],
      remove: true,
    },
  };
};

export const logger = pino(createLogger());
