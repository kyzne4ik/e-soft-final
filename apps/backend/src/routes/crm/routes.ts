import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { InviteService } from "@modules/auth/invite/invite.service";
import { InviteTokenStore } from "@modules/auth/invite/invite-token.store";
import { LeadService } from "@modules/crm/lead.service";
import { LeadController } from "@modules/crm/lead.controller";
import { LeadRepository } from "@modules/crm/lead.repository";
import { StreamService } from "@modules/lms/stream/stream.service";
import { StreamRepository } from "@modules/lms/stream/stream.repository";
import { UserRepository } from "@modules/user/user.repository";
import { StreamStudentService } from "@modules/lms/stream/stream-student/stream-student.service";
import { StreamStudentRepository } from "@modules/lms/stream/stream-student/stream-student.repository";
import { StreamGuard } from "@modules/lms/stream/stream.guard";

export default async function crmRoutes(fastify: FastifyInstance) {
  const controller = new LeadController(
    new LeadService(
      new LeadRepository(db),
      new InviteService(new InviteTokenStore(fastify.redis)),
      new StreamService(new StreamRepository(db)),
      new UserRepository(db),
      new StreamStudentService(
        new StreamStudentRepository(db),
        new StreamGuard(db),
      ),
    ),
  );

  fastify.get(
    "/leads",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: {
        tags: ["Leads"],
        summary: "Список заявок с фильтрами (менеджер)",
      },
    },
    controller.getAll,
  );

  fastify.get(
    "/leads/:id",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Leads"], summary: "Карточка заявки (менеджер)" },
    },
    controller.getById,
  );

  fastify.post(
    "/leads",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Leads"], summary: "Создать заявку вручную (менеджер)" },
    },
    controller.create,
  );

  fastify.patch(
    "/leads/:id/status",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: {
        tags: ["Leads"],
        summary: "Сменить статус заявки; ACCEPTED -> инвайт, REJECTED → письмо",
      },
    },
    controller.updateStatus,
  );
}
