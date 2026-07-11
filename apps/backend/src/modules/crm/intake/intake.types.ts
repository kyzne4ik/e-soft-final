import {
  LeadResponse,
  CreateLeadPayload,
  OpenIntakeResponse,
} from "@repo/schemas";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IIntakeService {
  ingest: (data: CreateLeadPayload, streamId: number) => Promise<LeadResponse>;
  openIntake: (
    streamId: number,
    expiresIn: number,
  ) => Promise<OpenIntakeResponse>;
}

export interface IIntakeController {
  intake: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  openIntake: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}
