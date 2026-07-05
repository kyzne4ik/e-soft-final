import {
  StreamTelegramResponse,
  BindStreamTelegramPayload,
} from "@repo/schemas";
import { NotFoundError } from "@error";
import { IStreamTelegramService } from "./stream-telegram.types";
import { StreamTelegramRepository } from "./stream-telegram.repository";

export class StreamTelegramService implements IStreamTelegramService {
  constructor(private streamTelegramRepo: StreamTelegramRepository) {}

  async findByStreamId(streamId: number): Promise<StreamTelegramResponse> {
    const streamTelegram =
      await this.streamTelegramRepo.findByStreamId(streamId);

    if (!streamTelegram)
      throw new NotFoundError("Не удалось найти telegram потока");

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
