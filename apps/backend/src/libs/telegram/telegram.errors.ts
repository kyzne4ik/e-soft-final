import { GrammyError } from "grammy";

/**
 * Ошибка из телеги
 * 400 - битый HTML
 * 403 - заблокировали бота
 */

export const isTerminalTelegramError = (e: unknown): boolean =>
  e instanceof GrammyError && (e.error_code === 400 || e.error_code === 403);
