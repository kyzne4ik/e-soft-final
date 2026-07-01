import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { CourseService } from "@modules/lms/course/course.service";
import { CourseController } from "@modules/lms/course/course.controller";
import { CourseRepository } from "@modules/lms/course/course.repository";

export default async function coursesRoutes(fastify: FastifyInstance) {
  const controller = new CourseController(
    new CourseService(new CourseRepository(db)),
  );

  fastify.get(
    "/",
    { schema: { tags: ["Courses"], summary: "Список курсов" } },
    controller.getAll,
  );

  fastify.get(
    "/:id",
    { schema: { tags: ["Courses"], summary: "Курс по id" } },
    controller.getById,
  );

  fastify.post(
    "/",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Courses"], summary: "Создать курс" },
    },
    controller.create,
  );

  fastify.patch(
    "/:id",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Courses"], summary: "Обновить курс" },
    },
    controller.update,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: fastify.authorize("MANAGER"),
      schema: { tags: ["Courses"], summary: "Удалить курс" },
    },
    controller.delete,
  );
}
