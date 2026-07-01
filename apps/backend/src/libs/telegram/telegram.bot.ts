import { Role } from "@repo/schemas";
import { Context, NextFunction } from "grammy";
import { TelegramClient } from "./telegram.client";
import { UserRepository } from "@modules/user/user.repository";
import { StartTemplate, AccessTemplate, TopicTemplate } from "./templates";
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
        await ctx.reply(AccessTemplate.notLinked());
        return;
      }

      const user = await this.userRepo.findById(link.userId);
      if (!user) {
        await ctx.reply(AccessTemplate.accountNotFound());
        return;
      }

      if (user.role !== "ADMIN" && !roles.includes(user.role)) {
        await ctx.reply(AccessTemplate.forbidden());
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
        await ctx.reply(StartTemplate.welcome(username));
        return;
      }

      const userId = await this.userTelegramStore.resolveToken(ctx.match);

      if (!userId) {
        await ctx.reply(StartTemplate.linkInvalid());
        return;
      }

      await this.userTelegramRepo.createByUserId(Number(userId), {
        tgId: String(ctx.from?.id),
        tgUsername: ctx.from?.username ?? null,
      });

      await ctx.reply(StartTemplate.linkSuccess());
    });

    bot.command("topic_id", this.requireRole("MANAGER"), async (ctx) => {
      const threadId = ctx.message?.message_thread_id;
      if (!ctx.message?.is_topic_message || threadId === undefined) {
        return ctx.reply(TopicTemplate.notInTopic());
      }
      await ctx.reply(TopicTemplate.ids(ctx.chat.id, threadId), {
        parse_mode: "HTML",
      });
    });
  }
}
