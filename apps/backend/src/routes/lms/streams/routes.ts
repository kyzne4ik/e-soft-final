import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { StreamService } from "@modules/lms/stream/stream.service";
import { StreamController } from "@modules/lms/stream/stream.controller";
import { StreamRepository } from "@modules/lms/stream/stream.repository";

export default async function streamsRoutes(fastify: FastifyInstance) {
  const controller = new StreamController(
    new StreamService(new StreamRepository(db)),
  );

  fastify.get(
    "/",
    { schema: { tags: ["Streams"], summary: "Список потоков" } },
    controller.getAll,
  );

  fastify.get(
    "/:id",
    { schema: { tags: ["Streams"], summary: "Поток по id" } },
    controller.getById,
  );

  fastify.post(
    "/",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: { tags: ["Streams"], summary: "Создать поток (админ)" },
    },
    controller.create,
  );

  fastify.patch(
    "/:id",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: { tags: ["Streams"], summary: "Обновить поток (админ)" },
    },
    controller.update,
  );

  fastify.delete(
    "/:id",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: { tags: ["Streams"], summary: "Удалить поток (админ)" },
    },
    controller.delete,
  );
}
