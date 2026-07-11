import fp from "fastify-plugin";
import { RedisConfig } from "@config";
import { fastifyRateLimit } from "@fastify/rate-limit";

export default fp(
  async function (fastify) {
    fastify.register(fastifyRateLimit, {
      max: 100,
      timeWindow: "1 minute",
      redis: fastify.redis,
      global: true,
      errorResponseBuilder: () => {
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
