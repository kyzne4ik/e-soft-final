import {
  UserTelegramDto,
  CreateUserTelegramPayload,
  UpdateUserTelegramPayload,
} from "@repo/schemas";
import { eq } from "drizzle-orm";
import { DatabaseType, userTelegram } from "@repo/database";
import { IUserTelegramRepository } from "./user-telegram.types";

export class UserTelegramRepository implements IUserTelegramRepository {
  constructor(private db: DatabaseType) {}

  async findByUserId(userId: number): Promise<UserTelegramDto | null> {
    const [row] = await this.db
      .select()
      .from(userTelegram)
      .where(eq(userTelegram.userId, userId));

    return row ?? null;
  }

  async createByUserId(
    userId: number,
    data: CreateUserTelegramPayload,
  ): Promise<UserTelegramDto> {
    const [row] = await this.db
      .insert(userTelegram)
      .values({
        userId,
        ...data,
      })
      .returning()
      .onConflictDoUpdate({
        target: userTelegram.userId,
        set: data,
      });

    if (!row) throw new Error("Ошибка при создании userTelegram");

    return row;
  }

  async updateByUserId(
    userId: number,
    data: UpdateUserTelegramPayload,
  ): Promise<UserTelegramDto | null> {
    const [row] = await this.db
      .update(userTelegram)
      .set({
        userId,
        ...data,
      })
      .where(eq(userTelegram.userId, userId))
      .returning();

    return row ?? null;
  }

  async deleteByUserId(userId: number): Promise<boolean> {
    const deleted = await this.db
      .delete(userTelegram)
      .where(eq(userTelegram.userId, userId))
      .returning({ id: userTelegram.id });

    return deleted.length > 0;
  }
}
