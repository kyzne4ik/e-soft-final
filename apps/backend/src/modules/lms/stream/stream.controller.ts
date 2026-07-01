import { ResponseToolKit } from "@utils/response";
import { IStreamController } from "./stream.types";
import { FastifyRequest, FastifyReply } from "fastify";
import { bindStreamTelegramPayloadSchema, idParamSchema } from "@repo/schemas";
import { StreamTelegramService } from "./stream-telegram/stream-telegram.service";

export class StreamController implements IStreamController {
  constructor(private streamTelegramService: StreamTelegramService) {}

  getTelegram = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.streamTelegramService.findByStreamId(id);

    return rep.send(ResponseToolKit.success(result));
  };

  bindTelegram = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const body = bindStreamTelegramPayloadSchema.parse(req.body);
    const result = await this.streamTelegramService.bindTelegram(id, body);

    return rep.send(
      ResponseToolKit.success(result, "Telegram привязан к потоку"),
    );
  };

  unbindTelegram = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    await this.streamTelegramService.unbindTelegram(id);

    return rep.send(
      ResponseToolKit.success(null, "Telegram отвязан от потока"),
    );
  };
}
