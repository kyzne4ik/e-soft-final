import { eq } from "drizzle-orm";
import { DatabaseType, streamTelegram } from "@repo/database";
import { IStreamTelegramRepository } from "./stream-telegram.types";
import { BindStreamTelegramPayload, StreamTelegramDto } from "@repo/schemas";

export class StreamTelegramRepository implements IStreamTelegramRepository {
  constructor(private db: DatabaseType) {}

  async findByStreamId(streamId: number): Promise<StreamTelegramDto | null> {
    const [row] = await this.db
      .select()
      .from(streamTelegram)
      .where(eq(streamTelegram.streamId, streamId));

    if (!row) return null;

    return row;
  }

  async createByStreamId(
    streamId: number,
    data: BindStreamTelegramPayload,
  ): Promise<StreamTelegramDto | null> {
    const [row] = await this.db
      .insert(streamTelegram)
      .values({
        streamId,
        linkedAt: new Date(),
        ...data,
      })
      .onConflictDoUpdate({
        target: streamTelegram.streamId,
        set: data,
      })
      .returning();

    if (!row) return null;

    return row;
  }

  async deleteByStreamId(streamId: number): Promise<boolean> {
    const deleted = await this.db
      .delete(streamTelegram)
      .where(eq(streamTelegram.streamId, streamId))
      .returning({
        id: streamTelegram.id,
      });

    return deleted.length > 0;
  }
}
