import { FastifyReply, FastifyRequest } from "fastify";

export interface IHealthController {
  getHealth: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}
