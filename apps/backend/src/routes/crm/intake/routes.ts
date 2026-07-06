import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { IntakeService } from "@modules/crm/intake/intake.service";
import { IntakeController } from "@modules/crm/intake/intake.controller";
import { LeadRepository } from "@modules/crm/lead.repository";
import { StreamRepository } from "@modules/lms/stream/stream.repository";

export default async function crmIntakeRoutes(fastify: FastifyInstance) {
  const controller = new IntakeController(
    new IntakeService(
      new LeadRepository(db),
      new StreamRepository(db),
      fastify.jwt,
    ),
  );

  fastify.post(
    "/open",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: {
        tags: ["Intake"],
        summary: "Открыть набор: включить приём и выдать JWT (менеджер)",
      },
    },
    controller.openIntake,
  );
}
