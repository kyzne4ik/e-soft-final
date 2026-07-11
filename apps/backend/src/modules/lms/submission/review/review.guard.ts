import { eq } from "drizzle-orm";
import { IReviewGuard } from "./review.types";
import { DatabaseType, reviews } from "@repo/database";
import { NotFoundError, ForbiddenError } from "@error";
import { ReviewDto } from "@repo/schemas";

export class ReviewGuard implements IReviewGuard {
  constructor(private db: DatabaseType) {}

  async assertOwnReview(
    reviewId: number,
    mentorId: number,
  ): Promise<ReviewDto> {
    const [review] = await this.db
      .select()
      .from(reviews)
      .where(eq(reviews.id, reviewId));

    if (!review) throw new NotFoundError("Ревью не найдено");

    if (review.mentorId !== mentorId)
      throw new ForbiddenError("Нельзя редактировать чужое ревью");

    return review;
  }
}
