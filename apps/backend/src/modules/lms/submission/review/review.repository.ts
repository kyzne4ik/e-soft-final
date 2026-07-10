import {
  users,
  reviews,
  tasks,
  submission,
  DatabaseType,
  studentProfile,
} from "@repo/database";
import {
  ReviewDto,
  CreateReviewRepositoryPayload,
  UpdateReviewRepositoryPayload,
} from "@repo/schemas";
import { eq } from "drizzle-orm";
import { IReviewRepository } from "./review.types";

export class ReviewRepository implements IReviewRepository {
  constructor(private db: DatabaseType) {}

  async findById(id: number): Promise<ReviewDto | null> {
    const [review] = await this.db
      .select()
      .from(reviews)
      .where(eq(reviews.id, id));

    return review ?? null;
  }

  async findStudentUserId(submissionId: number): Promise<number | null> {
    const [row] = await this.db
      .select({ userId: users.id })
      .from(submission)
      .innerJoin(studentProfile, eq(studentProfile.id, submission.studentId))
      .innerJoin(users, eq(users.id, studentProfile.userId))
      .where(eq(submission.id, submissionId))
      .limit(1);

    return row?.userId ?? null;
  }

  async findStudentNotificationContext(submissionId: number): Promise<{
    studentUserId: number;
    taskId: number;
    taskTitle: string;
  } | null> {
    const [row] = await this.db
      .select({
        studentUserId: users.id,
        taskId: submission.taskId,
        taskTitle: tasks.title,
      })
      .from(submission)
      .innerJoin(tasks, eq(tasks.id, submission.taskId))
      .innerJoin(studentProfile, eq(studentProfile.id, submission.studentId))
      .innerJoin(users, eq(users.id, studentProfile.userId))
      .where(eq(submission.id, submissionId))
      .limit(1);

    return row ?? null;
  }

  async create(data: CreateReviewRepositoryPayload): Promise<ReviewDto> {
    return await this.db.transaction(async (tx) => {
      const [review] = await tx
        .insert(reviews)
        .values({
          submissionId: data.submissionId,
          mentorId: data.mentorId,
          score: data.score,
          comment: data.comment,
        })
        .returning();

      if (!review) throw new Error("Ошибка при создании ревью");

      await tx
        .update(submission)
        .set({
          status: data.verdict,
          updatedAt: new Date(),
        })
        .where(eq(submission.id, data.submissionId));

      return review;
    });
  }

  async update(
    id: number,
    data: UpdateReviewRepositoryPayload,
  ): Promise<ReviewDto | null> {
    return await this.db.transaction(async (tx) => {
      const [review] = await tx
        .update(reviews)
        .set({
          score: data.score,
          comment: data.comment,
          reviewedAt: new Date(),
        })
        .where(eq(reviews.id, id))
        .returning();

      if (!review) throw new Error("Ошибка при обновлении ревью");

      if (data.verdict) {
        await tx
          .update(submission)
          .set({
            status: data.verdict,
            updatedAt: new Date(),
          })
          .where(eq(submission.id, review.submissionId));
      }

      return review;
    });
  }
}
