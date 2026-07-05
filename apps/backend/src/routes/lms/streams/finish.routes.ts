import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { StreamService } from "@modules/lms/stream/stream.service";
import { StreamController } from "@modules/lms/stream/stream.controller";
import { StreamRepository } from "@modules/lms/stream/stream.repository";

export default async function streamFinishRoutes(fastify: FastifyInstance) {
  const controller = new StreamController(
    new StreamService(new StreamRepository(db)),
  );

  fastify.post(
    "/:id/start",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Запустить поток (ENROLLING -> IN_PROGRESS) (админ)",
      },
    },
    controller.startStream,
  );

  fastify.post(
    "/:id/finish",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Завершить поток и выпустить студентов (админ)",
      },
    },
    controller.finishStreamAndGraduateStudents,
  );

  fastify.post(
    "/:id/revert-finish",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Отменить завершение потока (админ)",
      },
    },
    controller.revertStreamFinish,
  );
}
