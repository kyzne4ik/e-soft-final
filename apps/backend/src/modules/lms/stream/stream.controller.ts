import {
  idParamSchema,
  streamQuerySchema,
  createStreamPayloadSchema,
  updateStreamPayloadSchema,
} from "@repo/schemas";
import { ResponseToolKit } from "@utils";
import { StreamService } from "./stream.service";
import { IStreamController } from "./stream.types";
import { FastifyRequest, FastifyReply } from "fastify";

export class StreamController implements IStreamController {
  constructor(private streamService: StreamService) {}

  getAll = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const query = streamQuerySchema.parse(req.query);
    const result = await this.streamService.getStreams(query);

    return rep.send(ResponseToolKit.paginated(result));
  };

  getById = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.streamService.getStream(id);

    return rep.send(ResponseToolKit.success(result));
  };

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = createStreamPayloadSchema.parse(req.body);
    const result = await this.streamService.createStream(body);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Поток создан", 201));
  };

  update = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const body = updateStreamPayloadSchema.parse(req.body);
    const result = await this.streamService.updateStream(id, body);

    return rep.send(ResponseToolKit.success(result, "Поток обновлён"));
  };

  delete = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    await this.streamService.deleteStream(id);

    return rep.send(ResponseToolKit.success(null, "Поток удалён"));
  };

  startStream = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.streamService.startStream(id);

    return rep.send(ResponseToolKit.success(result, "Поток запущен"));
  };

  finishStreamAndGraduateStudents = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.streamService.finishStreamAndGraduateStudents(id);

    return rep.send(ResponseToolKit.success(result, "Поток завершён"));
  };

  revertStreamFinish = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.streamService.revertStreamFinish(id);

    return rep.send(ResponseToolKit.success(result, "Поток восстановлен"));
  };
}
