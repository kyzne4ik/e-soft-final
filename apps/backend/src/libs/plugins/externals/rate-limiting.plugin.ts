import fp from "fastify-plugin";
import { fastifyRateLimit } from "@fastify/rate-limit";
import { FastifyRequest } from "fastify";
import { RedisConfig } from "@config";

export default fp(
  async function (fastify) {
    fastify.register(fastifyRateLimit, {
      max: 100,
      timeWindow: "1 minute",
      redis: fastify.redis,
      global: true,
      errorResponseBuilder: (_request: FastifyRequest, context) => {
        return {
          status: 429,
          success: false,
          message: "Too many requests. Please try again later.",
        };
      },
    });

    fastify.log.info({
      msg: "Rate limiting enabled",
      redis: `${RedisConfig.REDIS_HOST}:${RedisConfig.REDIS_PORT}`,
      max: 100,
      timeWindow: "1 minute",
    });
  },
  {
    name: "rate-limiting-plugin",
  },
);
