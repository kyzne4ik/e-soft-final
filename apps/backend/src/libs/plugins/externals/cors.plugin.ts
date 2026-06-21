import fp from "fastify-plugin";
import { fastifyCors } from "@fastify/cors";
import { CorsConfig } from "@config/cors.config";

export default fp(
  async function (fastify) {
    await fastify.register(fastifyCors, {
      origin: CorsConfig.CORS_ORIGIN,
      methods: CorsConfig.CORS_METHODS,
      allowedHeaders: CorsConfig.CORS_ALLOWED_HEADERS,
      exposedHeaders: CorsConfig.CORS_EXPOSED_HEADERS,
      maxAge: CorsConfig.CORS_MAX_AGE,
      credentials: CorsConfig.CORS_CREDENTIALS,
    });

    fastify.log.info({
      msg: "CORS enabled",
      allowedOrigins: CorsConfig.CORS_ORIGIN,
      methods: CorsConfig.CORS_METHODS,
      credentials: CorsConfig.CORS_CREDENTIALS,
    });
  },
  { name: "cors-plugin" },
);
