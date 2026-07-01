import {
  BindStreamTelegramPayload,
  StreamTelegramResponse,
} from "@repo/schemas";
import { StreamTelegramRepository } from "./stream-telegram.repository";
import { IStreamTelegramService } from "./stream-telegram.types";
import { NotFoundError } from "@error/not-found.error";

export class StreamTelegramService implements IStreamTelegramService {
  constructor(private streamTelegramRepo: StreamTelegramRepository) {}

  async findByStreamId(streamId: number): Promise<StreamTelegramResponse> {
    const streamTelegram =
      await this.streamTelegramRepo.findByStreamId(streamId);
    console.debug("[get-telegram]", { streamTelegram });

    if (!streamTelegram)
      throw new NotFoundError("Не удалось найти streamTelegram");

    return streamTelegram;
  }

  async bindTelegram(
    streamId: number,
    data: BindStreamTelegramPayload,
  ): Promise<StreamTelegramResponse | null> {
    const streamTelegram = await this.streamTelegramRepo.createByStreamId(
      streamId,
      data,
    );

    if (!streamTelegram) return null;

    return streamTelegram;
  }

  async unbindTelegram(streamId: number): Promise<boolean> {
    const streamTelegram =
      await this.streamTelegramRepo.deleteByStreamId(streamId);
    return streamTelegram;
  }
}
