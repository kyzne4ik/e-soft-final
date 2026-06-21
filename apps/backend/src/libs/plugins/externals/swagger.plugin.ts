import fp from "fastify-plugin";
import { AppConfig } from "@config";
import fastifySwagger from "@fastify/swagger";
import { jsonSchemaTransform } from "fastify-type-provider-zod";
import ScalarApiReference from "@scalar/fastify-api-reference";

export default fp(
  async function (fastify) {
    fastify.register(fastifySwagger, {
      openapi: {
        info: {
          title: AppConfig.APP_NAME,
          version: "1.0.0",
        },
        components: {
          securitySchemes: {
            BearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
      },
      transform: jsonSchemaTransform,
    });

    await fastify.register(ScalarApiReference, {
      routePrefix: "/docs",
      configuration: {
        title: AppConfig.APP_NAME,
        theme: "fastify",
      },
    });

    fastify.log.info({
      msg: "Swagger enabled",
    });
  },
  {
    name: "swagger-plugin",
  },
);
