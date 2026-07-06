import fp from "fastify-plugin";
import { FastifyRequest } from "fastify";
import { UnauthorizedError } from "@error/unauthorized.error";

declare module "fastify" {
  interface FastifyInstance {
    verifyIngestToken: (
      request: FastifyRequest,
      reply: FastifyReply,
    ) => Promise<void>;
  }

  interface FastifyRequest {
    streamId?: number;
  }
}

type IntakeTokenPayload = { streamId?: number; scope?: string };

export default fp(
  async function ingestPlugin(fastify) {
    fastify.decorate(
      "verifyIngestToken",
      async function (request: FastifyRequest): Promise<void> {
        const header = request.headers.authorization;
        if (!header?.startsWith("Bearer "))
          throw new UnauthorizedError("Требуется ingest-токен");

        const token = header.slice("Bearer ".length);

        let payload: IntakeTokenPayload;
        try {
          payload = fastify.jwt.verify<IntakeTokenPayload>(token);
        } catch (e) {
          if ((e as { code?: string }).code === "FAST_JWT_EXPIRED")
            throw new UnauthorizedError("Срок действия ingest-токена истёк");
          throw new UnauthorizedError("Недействительный ingest-токен");
        }

        if (payload.scope !== "intake" || typeof payload.streamId !== "number")
          throw new UnauthorizedError("Недействительный ingest-токен");

        request.streamId = payload.streamId;
      },
    );
  },
  {
    name: "ingest-plugin",
  },
);
