import {
  NotificationResponse,
  CreateNotificationPayload,
  UnreadCountResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { enqueueTelegram } from "@bull";
import { NotFoundError } from "@error/not-found.error";
import { NotificationRepository } from "./notification.repository";
import { notificationMap, notificationsMap } from "./notification.mapper";
import { INotificationService, NotifyFilters } from "./notification.types";

export class NotificationService implements INotificationService {
  constructor(private notificationRepo: NotificationRepository) {}

  async getFeed(
    filters: NotifyFilters,
  ): Promise<PaginationResponse<NotificationResponse>> {
    const ns = await this.notificationRepo.findByUser(filters);
    return {
      ...ns,
      data: notificationsMap(ns.data),
    };
  }

  async create(data: CreateNotificationPayload): Promise<NotificationResponse> {
    const n = await this.notificationRepo.create(data);

    if (n.isSilent) {
      await this.notificationRepo.setStatus(n.id, "SENT");
    } else {
      const delay = n.sendAt ? Math.max(0, n.sendAt.getTime() - Date.now()) : 0;

      await enqueueTelegram(
        { kind: "user-dm", notificationId: n.id },
        { jobId: `notif-${n.id}`, delay },
      );
    }

    return notificationMap(n);
  }

  async getUnreadCount(userId: number): Promise<UnreadCountResponse> {
    const count = await this.notificationRepo.countUnread(userId);
    return { count };
  }

  async markRead(id: number, userId: number): Promise<NotificationResponse> {
    const n = await this.notificationRepo.markRead(id, userId);

    if (!n) throw new NotFoundError("Уведомление не найдено");

    return notificationMap(n);
  }

  async markAllRead(userId: number): Promise<number> {
    return await this.notificationRepo.markAllRead(userId);
  }
}
