import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { StreamGuard } from "@modules/lms/stream/stream.guard";
import { SubmissionGuard } from "@modules/lms/submission/submission.guard";
import { SubmissionService } from "@modules/lms/submission/submission.service";
import { SubmissionController } from "@modules/lms/submission/submission.controller";
import { SubmissionRepository } from "@modules/lms/submission/submission.repository";
import { NotificationService } from "@modules/notification/notification.service";
import { NotificationRepository } from "@modules/notification/notification.repository";

export default async function submissionsRoutes(fastify: FastifyInstance) {
  const controller = new SubmissionController(
    new SubmissionService(
      new SubmissionRepository(db),
      new SubmissionGuard(db),
      new StreamGuard(db),
      new NotificationService(new NotificationRepository(db)),
    ),
  );

  fastify.post(
    "/",
    {
      preHandler: fastify.authorize("STUDENT"),
      schema: {
        tags: ["Submissions"],
        summary: "Отправить решение (студент)",
      },
    },
    controller.create,
  );

  fastify.patch(
    "/:id",
    {
      preHandler: fastify.authorize("STUDENT"),
      schema: {
        tags: ["Submissions"],
        summary: "Обновить своё решение (студент)",
      },
    },
    controller.update,
  );

  fastify.get(
    "/performance/:id",
    {
      preHandler: fastify.authorize("STUDENT"),
      schema: {
        tags: ["Submissions"],
        summary: "Успеваемость по потоку (:id = streamId, студент)",
      },
    },
    controller.getStudentPerformance,
  );

  fastify.get(
    "/task/:id",
    {
      preHandler: fastify.authorize("STUDENT"),
      schema: {
        tags: ["Submissions"],
        summary: "Своя сдача по задаче + ревью (:id = taskId, студент)",
      },
    },
    controller.getStudentSubmissionByTask,
  );

  fastify.get(
    "/mentor/journal",
    {
      preHandler: fastify.authorize("MENTOR"),
      schema: {
        tags: ["Submissions"],
        summary: "Журнал успеваемости студентов ментора по потоку (?streamId=)",
      },
    },
    controller.getMentorJournal,
  );

  fastify.get(
    "/mentor",
    {
      preHandler: fastify.authorize("MENTOR"),
      schema: {
        tags: ["Submissions"],
        summary: "Канбан: сдачи моих студентов (ментор)",
      },
    },
    controller.getMentorSubmissions,
  );

  fastify.get(
    "/mentor/:id",
    {
      preHandler: fastify.authorize("MENTOR"),
      schema: {
        tags: ["Submissions"],
        summary: "Карточка сдачи + история ревью (:id = submissionId, ментор)",
      },
    },
    controller.getMentorSubmissionById,
  );

  fastify.patch(
    "/:id/status",
    {
      preHandler: fastify.authorize("MENTOR"),
      schema: {
        tags: ["Submissions"],
        summary: "Сменить статус сдачи на канбане (ментор)",
      },
    },
    controller.switchStatus,
  );

  fastify.get(
    "/:id",
    {
      preHandler: fastify.authorize("ADMIN"),
      schema: { tags: ["Submissions"], summary: "Сдача по id (админ)" },
    },
    controller.getById,
  );
}
