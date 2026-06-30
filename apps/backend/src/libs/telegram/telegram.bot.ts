import { Role } from "@repo/schemas";
import { Context, NextFunction } from "grammy";
import { TelegramClient } from "./telegram.client";
import { UserRepository } from "@modules/user/user.repository";
import { UserTelegramStore } from "@modules/profile/user-telegram/user-telegram.store";
import { UserTelegramRepository } from "@modules/profile/user-telegram/user-telegram.repository";

export class TelegramBot {
  constructor(
    private userTelegramRepo: UserTelegramRepository,
    private userTelegramStore: UserTelegramStore,
    private userRepo: UserRepository,
  ) {}

  private requireRole(...roles: Role[]) {
    return async (ctx: Context, next: NextFunction): Promise<void> => {
      const tgId = ctx.from?.id;
      if (!tgId) return;

      const link = await this.userTelegramRepo.findByTgId(String(tgId));
      if (!link) {
        await ctx.reply("❌ Сначала привяжите аккаунт командой /start.");
        return;
      }

      const user = await this.userRepo.findById(link.userId);
      if (!user) {
        await ctx.reply("❌ Аккаунт не найден.");
        return;
      }

      if (user.role !== "ADMIN" && !roles.includes(user.role)) {
        await ctx.reply("⛔ Недостаточно прав для этой команды.");
        return;
      }

      await next();
    };
  }

  registerBotHandlers(): void {
    const bot = TelegramClient.getBot();

    bot.command("start", async (ctx) => {
      const payload = ctx.match;
      const username = ctx.from?.username;

      if (!payload) {
        await ctx.reply(`
👋 Привет, ${username}!
Добро пожаловать в Школу Программирования Esoft 🎓
Мы обучаем Full-Stack разработке: Frontend (HTML, CSS, JS, React) и Backend (Node.js, PostgreSQL).
`);
        return;
      }

      const userId = await this.userTelegramStore.resolveToken(ctx.match);

      if (!userId) {
        await ctx.reply("❌ Ссылка недействительна или истекла.");
        return;
      }

      await this.userTelegramRepo.createByUserId(Number(userId), {
        tgId: String(ctx.from?.id),
        tgUsername: ctx.from?.username ?? null,
      });

      await ctx.reply("✅ Telegram успешно привязан!");
    });

    bot.command("topic_id", this.requireRole("MANAGER"), async (ctx) => {
      if (!ctx.message?.is_topic_message) {
        return ctx.reply("Запусти команду внутри нужного топика.");
      }
      await ctx.reply(
        `chatId: <code>${ctx.chat.id}</code>\n` +
          `topicId: <code>${ctx.message.message_thread_id}</code>`,
        { parse_mode: "HTML" },
      );
    });
  }
}
