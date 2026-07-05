import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { TaskService } from "@modules/lms/task/task.service";
import { TaskController } from "@modules/lms/task/task.controller";
import { TaskRepository } from "@modules/lms/task/task.repository";
import { StreamGuard } from "@modules/lms/stream/stream.guard";

export default async function tasksRoutes(fastify: FastifyInstance) {
  const controller = new TaskController(
    new TaskService(new TaskRepository(db), new StreamGuard(db)),
  );

  fastify.get(
    "/",
    {
      schema: {
        tags: ["Homework"],
        summary: "Список домашних заданий (фильтр по streamId)",
      },
    },
    controller.getAll,
  );

  fastify.get(
    "/:id",
    { schema: { tags: ["Homework"], summary: "Домашнее задание по id" } },
    controller.getById,
  );

  fastify.post(
    "/",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Homework"],
        summary: "Создать домашнее задание (админ)",
      },
    },
    controller.create,
  );

  fastify.patch(
    "/:id",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Homework"],
        summary: "Обновить домашнее задание (админ)",
      },
    },
    controller.update,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Homework"],
        summary: "Удалить домашнее задание (админ)",
      },
    },
    controller.delete,
  );
}
