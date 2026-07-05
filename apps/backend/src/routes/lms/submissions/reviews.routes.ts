import { db } from "@repo/database";
import { FastifyInstance } from "fastify";
import { ReviewService } from "@modules/lms/submission/review/review.service";
import { ReviewController } from "@modules/lms/submission/review/review.controller";
import { ReviewRepository } from "@modules/lms/submission/review/review.repository";
import { ReviewGuard } from "@modules/lms/submission/review/review.guard";
import { StreamGuard } from "@modules/lms/stream/stream.guard";

export default async function reviewsRoutes(fastify: FastifyInstance) {
  const controller = new ReviewController(
    new ReviewService(
      new ReviewRepository(db),
      new ReviewGuard(db),
      new StreamGuard(db),
    ),
  );

  fastify.post(
    "/:id/reviews",
    {
      preHandler: fastify.authorize("MENTOR"),
      schema: {
        tags: ["Reviews"],
        summary: "Оставить ревью на сдачу (:id = submissionId, ментор)",
      },
    },
    controller.create,
  );

  fastify.patch(
    "/:id/reviews/:reviewId",
    {
      preHandler: fastify.authorize("MENTOR"),
      schema: {
        tags: ["Reviews"],
        summary: "Обновить своё ревью (ментор)",
      },
    },
    controller.update,
  );
}
