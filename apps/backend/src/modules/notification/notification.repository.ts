import {
  CreateNotificationPayload,
  NotificationDto,
  NotificationStatus,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { count, and, eq } from "drizzle-orm";
import { DatabaseType, notifications } from "@repo/database";
import { INotificationRepository, NotifyFilters } from "./notification.types";

export class NotificationRepository implements INotificationRepository {
  constructor(private db: DatabaseType) {}

  async findByUser(
    filters: NotifyFilters,
  ): Promise<PaginationResponse<NotificationDto>> {
    const { userId, isRead, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [];
    conditions.push(eq(notifications.userId, userId));
    if (isRead !== undefined) conditions.push(eq(notifications.isRead, isRead));

    const where = conditions.length ? and(...conditions) : undefined;

    const [rows, totalRows] = await Promise.all([
      await this.db
        .select()
        .from(notifications)
        .where(where)
        .limit(limit)
        .offset(offset),
      await this.db.select({ value: count() }).from(notifications).where(where),
    ]);

    return {
      data: rows,
      meta: {
        page,
        limit,
        total: totalRows[0]?.value || 0,
      },
    };
  }

  async create(data: CreateNotificationPayload): Promise<NotificationDto> {
    const [row] = await this.db
      .insert(notifications)
      .values({
        userId: data.userId,
        message: data.message,
        isSilent: data.isSilent ?? false,
        sendAt: data.sendAt ?? null,
      })
      .returning();

    if (!row) throw new Error("Ошибка при создании уведомления");

    return row;
  }

  async findById(id: number): Promise<NotificationDto | null> {
    const [row] = await this.db
      .select()
      .from(notifications)
      .where(eq(notifications.id, id));

    return row ?? null;
  }

  async setStatus(id: number, status: NotificationStatus): Promise<void> {
    await this.db
      .update(notifications)
      .set({ status })
      .where(eq(notifications.id, id));
  }

  async countUnread(userId: number): Promise<number> {
    const [total] = await this.db
      .select({ value: count() })
      .from(notifications)
      .where(
        and(eq(notifications.userId, userId), eq(notifications.isRead, false)),
      );
    return total?.value || 0;
  }

  async markRead(id: number, userId: number): Promise<NotificationDto | null> {
    const [row] = await this.db
      .update(notifications)
      .set({
        isRead: true,
      })
      .where(and(eq(notifications.userId, userId), eq(notifications.id, id)))
      .returning();

    if (!row) return null;

    return row;
  }

  async markAllRead(userId: number): Promise<number> {
    const updated = await this.db
      .update(notifications)
      .set({
        isRead: true,
      })
      .where(
        and(eq(notifications.userId, userId), eq(notifications.isRead, false)),
      )
      .returning({ id: notifications.id });

    return updated.length;
  }
}
