import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { InviteService } from "@modules/auth/invite/invite.service";
import { InviteTokenStore } from "@modules/auth/invite/invite-token.store";
import { LeadService } from "@modules/crm/lead.service";
import { LeadController } from "@modules/crm/lead.controller";
import { LeadRepository } from "@modules/crm/lead.repository";

export default async function crmRoutes(fastify: FastifyInstance) {
  const controller = new LeadController(
    new LeadService(
      new LeadRepository(db),
      new InviteService(new InviteTokenStore(fastify.redis)),
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
