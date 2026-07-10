import {
  ReviewResponse,
  CreateReviewPayload,
  UpdateReviewPayload,
} from "@repo/schemas";
import { reviewMap } from "./review.mapper";
import { isPgError, PG } from "@repo/database";
import { IReviewService } from "./review.types";
import { ReviewRepository } from "./review.repository";
import { NotFoundError } from "@error";
import { ReviewGuard } from "./review.guard";
import { StreamGuard } from "@modules/lms/stream/stream.guard";
import { NotificationService } from "@modules/notification/notification.service";
import { buildStudentTaskLink } from "@utils/build-links";
import { SubmissionTemplate } from "@telegram/templates";

export class ReviewService implements IReviewService {
  constructor(
    private reviewRepo: ReviewRepository,
    private reviewGuard: ReviewGuard,
    private streamGuard: StreamGuard,
    private notificationService: NotificationService,
  ) {}

  async createReview(
    mentorId: number,
    submissionId: number,
    data: CreateReviewPayload,
  ): Promise<ReviewResponse> {
    const streamId = await this.streamGuard.streamIdBySubmission(submissionId);
    await this.streamGuard.assertActive(streamId);

    try {
      const review = await this.reviewRepo.create({
        submissionId,
        mentorId,
        score: data.score,
        comment: data.comment,
        verdict: data.verdict,
      });

      if (!review) throw new Error("Не удалось создать ревью");

      const ctx =
        await this.reviewRepo.findStudentNotificationContext(submissionId);
      if (ctx) {
        const link = buildStudentTaskLink(ctx.taskId);
        const message =
          data.verdict === "ACCEPTED"
            ? SubmissionTemplate.reviewAccepted({
                taskTitle: ctx.taskTitle,
                score: data.score,
                link,
              })
            : SubmissionTemplate.reviewChangesRequested({
                taskTitle: ctx.taskTitle,
                score: data.score,
                link,
              });
        await this.notificationService.create({
          userId: ctx.studentUserId,
          message,
          isSilent: false,
        });
      }

      return reviewMap(review);
    } catch (e) {
      if (isPgError(e, PG.FK))
        throw new NotFoundError("Сдача или ментор не найдены");
      throw e;
    }
  }

  async updateReview(
    mentorId: number,
    reviewId: number,
    data: UpdateReviewPayload,
  ): Promise<ReviewResponse> {
    const review = await this.reviewGuard.assertOwnReview(reviewId, mentorId);
    const streamId = await this.streamGuard.streamIdBySubmission(
      review.submissionId,
    );
    await this.streamGuard.assertActive(streamId);

    const updated = await this.reviewRepo.update(reviewId, {
      score: data.score,
      comment: data.comment,
      verdict: data.verdict,
    });
    if (!updated) throw new NotFoundError("Ревью не найдено");

    const ctx = await this.reviewRepo.findStudentNotificationContext(
      review.submissionId,
    );
    if (ctx && data.verdict) {
      const link = buildStudentTaskLink(ctx.taskId);
      const message =
        data.verdict === "ACCEPTED"
          ? SubmissionTemplate.reviewAccepted({
              taskTitle: ctx.taskTitle,
              score: data.score ?? 0,
              link,
            })
          : SubmissionTemplate.reviewChangesRequested({
              taskTitle: ctx.taskTitle,
              score: data.score ?? 0,
              link,
            });
      await this.notificationService.create({
        userId: ctx.studentUserId,
        message,
        isSilent: false,
      });
    }

    return reviewMap(updated);
  }
}
