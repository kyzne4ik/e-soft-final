import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { NotificationService } from "@modules/notification/notification.service";
import { NotificationController } from "@modules/notification/notification.controller";
import { NotificationRepository } from "@modules/notification/notification.repository";

export default async function notificationsRoutes(fastify: FastifyInstance) {
  const controller = new NotificationController(
    new NotificationService(new NotificationRepository(db)),
  );

  fastify.get(
    "/",
    { schema: { tags: ["Notifications"], summary: "Моя лента уведомлений" } },
    controller.getFeed,
  );

  fastify.get(
    "/unread-count",
    { schema: { tags: ["Notifications"], summary: "Число непрочитанных" } },
    controller.getUnreadCount,
  );

  fastify.post(
    "/",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Notifications"], summary: "Создать уведомление" },
    },
    controller.create,
  );

  fastify.patch(
    "/read-all",
    {
      schema: { tags: ["Notifications"], summary: "Отметить всё прочитанным" },
    },
    controller.markAllRead,
  );

  fastify.patch(
    "/:id/read",
    {
      schema: { tags: ["Notifications"], summary: "Отметить одно прочитанным" },
    },
    controller.markRead,
  );
}
