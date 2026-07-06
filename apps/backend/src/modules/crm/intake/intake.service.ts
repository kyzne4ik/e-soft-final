import {
  LeadResponse,
  CreateLeadPayload,
  OpenIntakeResponse,
} from "@repo/schemas";
import { JWT } from "@fastify/jwt";
import { ForbiddenError, NotFoundError } from "@error";
import { leadMap } from "../lead.mapper";
import { LeadRepository } from "../lead.repository";
import { IIntakeService } from "./intake.types";
import { StreamRepository } from "@modules/lms/stream/stream.repository";

export class IntakeService implements IIntakeService {
  constructor(
    private leadRepo: LeadRepository,
    private streamRepo: StreamRepository,
    private jwt: JWT,
  ) {}

  async ingest(
    data: CreateLeadPayload,
    streamId: number,
  ): Promise<LeadResponse> {
    const stream = await this.streamRepo.findById(streamId);
    if (!stream) throw new NotFoundError("Поток не найден");
    if (stream.status !== "ENROLLING")
      throw new ForbiddenError("Набор закрыт или ещё не открыт");

    const lead = await this.leadRepo.upsertByEmail({
      ...data,
      targetStreamId: streamId,
    });

    return leadMap(lead);
  }

  async openIntake(
    streamId: number,
    expiresIn: number,
  ): Promise<OpenIntakeResponse> {
    const stream = await this.streamRepo.findById(streamId);
    if (!stream) throw new NotFoundError("Поток не найден");
    if (stream.status !== "ENROLLING")
      throw new ForbiddenError(
        "Открыть набор можно только для потока со статусом ENROLLING",
      );

    const token = this.jwt.sign({ streamId, scope: "intake" }, { expiresIn });

    return { token };
  }
}
