import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { IntakeService } from "@modules/crm/intake/intake.service";
import { IntakeController } from "@modules/crm/intake/intake.controller";
import { LeadRepository } from "@modules/crm/lead.repository";
import { StreamRepository } from "@modules/lms/stream/stream.repository";

export default async function intakeRoutes(fastify: FastifyInstance) {
  const controller = new IntakeController(
    new IntakeService(
      new LeadRepository(db),
      new StreamRepository(db),
      fastify.jwt,
    ),
  );

  fastify.post(
    "/",
    {
      preHandler: fastify.verifyIngestToken,
      schema: {
        tags: ["Intake"],
        summary: "Публичный приём заявки (JWT со streamId в Authorization)",
      },
    },
    controller.intake,
  );
}
