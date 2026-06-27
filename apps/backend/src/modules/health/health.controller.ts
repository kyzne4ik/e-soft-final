import { AppConfig } from "@config";
import { ResponseToolKit } from "@utils/response";
import { IHealthController } from "./health.types";
import { checkDatabaseConnection } from "@repo/database";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

type CheckStatus = "up" | "down";

async function check(probe: () => Promise<unknown>): Promise<CheckStatus> {
  try {
    await probe();
    return "up";
  } catch {
    return "down";
  }
}

export class HealthController implements IHealthController {
  constructor(private fastify: FastifyInstance) {}

  getHealth = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const [redis, database] = await Promise.all([
      check(() => this.fastify.redis.ping()),
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

    return rep.status(payload.status).send(payload);
  };
}
