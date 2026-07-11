import {
  idParamSchema,
  paginationSchema,
  streamMentorParamsSchema,
  addStreamMentorPayloadSchema,
} from "@repo/schemas";
import { ResponseToolKit } from "@utils";
import { FastifyRequest, FastifyReply } from "fastify";
import { StreamMentorService } from "./stream-mentor.service";
import { IStreamMentorController } from "./stream-mentor.types";

export class StreamMentorController implements IStreamMentorController {
  constructor(private streamMentorService: StreamMentorService) {}

  getMentors = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const query = paginationSchema.parse(req.query);
    const result = await this.streamMentorService.getMentors(id, query);

    return rep.send(ResponseToolKit.paginated(result));
  };

  addMentor = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const { mentorId } = addStreamMentorPayloadSchema.parse(req.body);
    const result = await this.streamMentorService.addMentor(id, mentorId);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Ментор привязан к потоку", 201));
  };

  deleteMentor = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id, mentorId } = streamMentorParamsSchema.parse(req.params);
    await this.streamMentorService.deleteMentor(id, mentorId);

    return rep.send(ResponseToolKit.success(null, "Ментор отвязан от потока"));
  };
}
