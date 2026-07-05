import {
  BindStreamTelegramPayload,
  StreamTelegramDto,
  StreamTelegramResponse,
} from "@repo/schemas";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IStreamTelegramRepository {
  findByStreamId: (streamId: number) => Promise<StreamTelegramDto | null>;
  createByStreamId: (
    streamId: number,
    data: BindStreamTelegramPayload,
  ) => Promise<StreamTelegramDto | null>;
  deleteByStreamId: (streamId: number) => Promise<boolean>;
}

export interface IStreamTelegramService {
  findByStreamId: (streamId: number) => Promise<StreamTelegramResponse>;
  bindTelegram: (
    streamId: number,
    data: BindStreamTelegramPayload,
  ) => Promise<StreamTelegramResponse | null>;
  unbindTelegram: (streamId: number) => Promise<boolean>;
}

export interface IStreamController {
  getTelegram: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  bindTelegram: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  unbindTelegram: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
}
