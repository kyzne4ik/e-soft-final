import { TelegramService } from "@telegram";
import { NotificationRepository } from "@modules/notification/notification.repository";
import { UserTelegramRepository } from "@modules/profile/user-telegram/user-telegram.repository";
import { isTerminalTelegramError } from "../telegram.errors";
import { UnrecoverableError } from "bullmq";
import { GrammyError } from "grammy";

export class NotificationDelivery {
  constructor(
    private userTelegramRepo: UserTelegramRepository,
    private notificationRepo: NotificationRepository,
    private telegramService: TelegramService,
  ) {}

  async deliverDm(notificationId: number): Promise<void> {
    const notification = await this.notificationRepo.findById(notificationId);
    if (!notification) return;
    if (notification.status === "SENT") return;

    const userTelegram = await this.userTelegramRepo.findByUserId(
      notification.userId,
    );
    if (!userTelegram?.tgId) return;

    try {
      await this.telegramService.sendToUser(
        userTelegram.tgId,
        notification.message,
      );
      await this.notificationRepo.setStatus(notification.id, "SENT");
    } catch (e) {
      if (isTerminalTelegramError(e)) {
        await this.notificationRepo.setStatus(notification.id, "FAILED");
        throw new UnrecoverableError(
          e instanceof GrammyError ? e.description : "terminal telegram error",
        );
      }
      throw e;
    }
  }
}
