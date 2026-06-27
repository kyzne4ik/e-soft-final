import { FastifyInstance } from "fastify";

export default function profileHooks(fastify: FastifyInstance) {
  fastify.addHook("preHandler", fastify.authenticate);
}
