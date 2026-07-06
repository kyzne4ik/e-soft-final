import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { StreamMentorService } from "@modules/lms/stream/stream-mentor/stream-mentor.service";
import { StreamMentorController } from "@modules/lms/stream/stream-mentor/stream-mentor.controller";
import { StreamMentorRepository } from "@modules/lms/stream/stream-mentor/stream-mentor.repository";
import { StreamGuard } from "@modules/lms/stream/stream.guard";

export default async function streamMentorsRoutes(fastify: FastifyInstance) {
  const controller = new StreamMentorController(
    new StreamMentorService(
      new StreamMentorRepository(db),
      new StreamGuard(db),
    ),
  );

  fastify.get(
    "/:id/mentors",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: { tags: ["Streams"], summary: "Список менторов потока (админ)" },
    },
    controller.getMentors,
  );

  fastify.post(
    "/:id/mentors",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Привязать ментора к потоку (админ)",
      },
    },
    controller.addMentor,
  );

  fastify.delete(
    "/:id/mentors/:mentorId",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Отвязать ментора от потока (админ)",
      },
    },
    controller.deleteMentor,
  );
}
