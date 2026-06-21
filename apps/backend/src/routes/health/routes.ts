import { AppConfig } from "@config";
import { checkDatabaseConnection } from "@repo/database";
import { ResponseToolKit } from "@utils";
import { FastifyInstance } from "fastify";

type CheckStatus = "up" | "down";

async function check(probe: () => Promise<unknown>): Promise<CheckStatus> {
  try {
    await probe();
    return "up";
  } catch {
    return "down";
  }
}

export default async function healthRoute(fastify: FastifyInstance) {
  fastify.get(
    "/",
    {
      schema: {
        tags: ["Health"],
        summary: "Проверка работоспособности и готовности",
      },
    },
    async (_request, reply) => {
      const [redis, database] = await Promise.all([
        check(() => fastify.redis.ping()),
        check(() => checkDatabaseConnection()),
      ]);

      const healthy = redis === "up" && database === "up";

      const payload = ResponseToolKit.success(
        {
          status: healthy ? "ok" : "degraded",
          uptime: Math.floor(process.uptime()),
          timestamps: new Date().toISOString(),
          environment: AppConfig.APP_ENV,
          services: { redis, database },
        },
        healthy ? "Service is healthy" : "Service is degraded",
        healthy ? 200 : 503,
      );

      return reply.status(payload.status).send(payload);
    },
  );
}
