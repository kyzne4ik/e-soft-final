import { FastifyInstance } from "fastify";

export default function notificationsHooks(fastify: FastifyInstance) {
  fastify.addHook("preHandler", fastify.authenticate);
}
