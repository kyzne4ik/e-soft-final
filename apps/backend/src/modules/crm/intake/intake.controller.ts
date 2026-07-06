import {
  createLeadPayloadSchema,
  openIntakePayloadSchema,
} from "@repo/schemas";
import { UnauthorizedError } from "@error";
import { ResponseToolKit } from "@utils";
import { FastifyRequest, FastifyReply } from "fastify";
import { IntakeService } from "./intake.service";
import { IIntakeController } from "./intake.types";

export class IntakeController implements IIntakeController {
  constructor(private intakeService: IntakeService) {}

  intake = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    if (req.streamId == null)
      throw new UnauthorizedError("Требуется ingest-токен");

    const body = createLeadPayloadSchema.parse(req.body);
    const result = await this.intakeService.ingest(body, req.streamId);

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Заявка отправлена", 201));
  };

  openIntake = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { streamId, expiresIn } = openIntakePayloadSchema.parse(req.body);
    const result = await this.intakeService.openIntake(streamId, expiresIn);

    return rep.send(ResponseToolKit.success(result, "Набор открыт"));
  };
}
