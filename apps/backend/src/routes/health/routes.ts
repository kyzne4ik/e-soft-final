import { FastifyInstance } from "fastify";
import { HealthController } from "@modules/health/health.controller";

export default async function healthRoute(fastify: FastifyInstance) {
  const controller = new HealthController(fastify);

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Health"],
        summary: "Проверка работоспособности и готовности",
      },
    },
    controller.getHealth,
  );
}
