import { FastifyInstance } from "fastify";

export default function lmsHooks(fastify: FastifyInstance) {
  fastify.addHook("preHandler", fastify.authenticate);
}
