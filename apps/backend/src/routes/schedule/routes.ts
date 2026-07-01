import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { ScheduleService } from "@modules/schedule/schedule.service";
import { ScheduleController } from "@modules/schedule/schedule.controller";
import { LessonRepository } from "@modules/schedule/lesson/lesson.repository";
import { LessonScheduler } from "@modules/schedule/lesson/lesson.scheduler";

export default async function scheduleRoutes(fastify: FastifyInstance) {
  const controller = new ScheduleController(
    new ScheduleService(new LessonRepository(db), new LessonScheduler()),
  );

  fastify.get(
    "/",
    { schema: { tags: ["Schedule"], summary: "Расписание занятий" } },
    controller.getAll,
  );

  fastify.get(
    "/:id",
    { schema: { tags: ["Schedule"], summary: "Занятие по id" } },
    controller.getById,
  );

  fastify.post(
    "/",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Schedule"], summary: "Создать занятие" },
    },
    controller.create,
  );

  fastify.patch(
    "/:id",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Schedule"], summary: "Обновить занятие" },
    },
    controller.update,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Schedule"], summary: "Удалить занятие" },
    },
    controller.delete,
  );
}
