import { Role } from "@repo/schemas";
import { ConflictError } from "@error";
import { Context, NextFunction } from "grammy";
import { TelegramClient } from "./telegram.client";
import { ProfileService } from "@modules/profile/profile.service";
import { StartTemplate, AccessTemplate, TopicTemplate } from "./templates";

export class TelegramBot {
  constructor(private profileService: ProfileService) {}

  private requireRole(...roles: Role[]) {
    return async (ctx: Context, next: NextFunction): Promise<void> => {
      const tgId = ctx.from?.id;
      if (!tgId) return;

      const user = await this.profileService.getUserByTgId(String(tgId));
      if (!user) {
        await ctx.reply(AccessTemplate.notLinked());
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

      const userId = await this.profileService.resolveLinkToken(ctx.match);

      if (!userId) {
        await ctx.reply(StartTemplate.linkInvalid());
        return;
      }

      try {
        await this.profileService.bindTelegram(Number(userId), {
          tgId: String(ctx.from?.id),
          tgUsername: ctx.from?.username ?? null,
        });
      } catch (e) {
        if (e instanceof ConflictError) {
          await ctx.reply(StartTemplate.alreadyLinked());
          return;
        }
        throw e;
      }

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
