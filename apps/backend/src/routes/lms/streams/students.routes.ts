import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { StreamGuard } from "@modules/lms/stream/stream.guard";
import { StreamStudentService } from "@modules/lms/stream/stream-student/stream-student.service";
import { StreamStudentController } from "@modules/lms/stream/stream-student/stream-student.controller";
import { StreamStudentRepository } from "@modules/lms/stream/stream-student/stream-student.repository";

export default async function (fastify: FastifyInstance) {
  const controller = new StreamStudentController(
    new StreamStudentService(
      new StreamStudentRepository(db),
      new StreamGuard(db),
    ),
  );

  fastify.get(
    "/:id/students",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: { tags: ["Streams"], summary: "Список студентов потока (админ)" },
    },
    controller.getStudents,
  );

  fastify.post(
    "/:id/students",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Добавить студента в поток (админ)",
      },
    },
    controller.addStudent,
  );

  fastify.patch(
    "/:id/students/:studentId/mentor",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Сменить ментора студента (админ)",
      },
    },
    controller.changeMentor,
  );

  fastify.patch(
    "/:id/students/:studentId/status",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Изменить статус студента в потоке (админ)",
      },
    },
    controller.updateStatus,
  );

  fastify.delete(
    "/:id/students/:studentId",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: {
        tags: ["Streams"],
        summary: "Удалить студента из потока (админ)",
      },
    },
    controller.deleteStudent,
  );
}
