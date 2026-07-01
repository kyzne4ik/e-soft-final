import { FastifyInstance } from "fastify";

export default function scheduleHooks(fastify: FastifyInstance) {
  fastify.addHook("preHandler", fastify.authenticate);
}
