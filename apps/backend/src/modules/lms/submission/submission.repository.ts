import {
  tasks,
  users,
  reviews,
  submission,
  DatabaseType,
  streamStudent,
  studentProfile,
} from "@repo/database";
import {
  SubmissionDto,
  SubmissionStatus,
  StudentPerformanceRow,
  SubmissionMentorQuery,
  CreateSubmissionRepositoryPayload,
  UpdateSubmissionRepositoryPayload,
} from "@repo/schemas";
import {
  ISubmissionRepository,
  SubmissionReviewRepositoryResponse,
} from "./submission.types";
import { PaginationResponse } from "@types";
import { and, count, desc, eq, getTableColumns } from "drizzle-orm";

export class SubmissionRepository implements ISubmissionRepository {
  constructor(private db: DatabaseType) {}

  async findMentorSubmissions(
    mentorId: number,
    filters: SubmissionMentorQuery = {},
  ): Promise<PaginationResponse<SubmissionDto>> {
    const { taskId, studentId, status, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [eq(streamStudent.mentorId, mentorId)];
    if (taskId !== undefined) conditions.push(eq(submission.taskId, taskId));
    if (studentId !== undefined)
      conditions.push(eq(submission.studentId, studentId));
    if (status !== undefined) conditions.push(eq(submission.status, status));
    const where = and(...conditions);

    const [data, totalRows] = await Promise.all([
      this.db
        .select(getTableColumns(submission))
        .from(submission)
        .innerJoin(tasks, eq(tasks.id, submission.taskId))
        .innerJoin(
          streamStudent,
          and(
            eq(streamStudent.studentId, submission.studentId),
            eq(streamStudent.streamId, tasks.streamId),
          ),
        )
        .where(where)
        .orderBy(desc(submission.createdAt))
        .limit(limit)
        .offset(offset),
      this.db
        .select({ value: count() })
        .from(submission)
        .innerJoin(tasks, eq(tasks.id, submission.taskId))
        .innerJoin(
          streamStudent,
          and(
            eq(streamStudent.studentId, submission.studentId),
            eq(streamStudent.streamId, tasks.streamId),
          ),
        )
        .where(where),
    ]);

    return {
      data,
      meta: { page, limit, total: totalRows[0]?.value || 0 },
    };
  }

  async findStudentPerformance(
    streamId: number,
    studentId: number,
  ): Promise<StudentPerformanceRow[]> {
    const rows = await this.db
      .select({
        taskId: tasks.id,
        title: tasks.title,
        status: submission.status,
        score: reviews.score,
        reviewedAt: reviews.reviewedAt,
        comment: reviews.comment,
      })
      .from(tasks)
      .leftJoin(
        submission,
        and(
          eq(submission.taskId, tasks.id),
          eq(submission.studentId, studentId),
        ),
      )
      .leftJoin(reviews, eq(reviews.submissionId, submission.id))
      .where(eq(tasks.streamId, streamId))
      .orderBy(tasks.id, desc(reviews.reviewedAt));

    const seen = new Set<number>();
    const result: StudentPerformanceRow[] = [];
    for (const row of rows) {
      if (seen.has(row.taskId)) continue;
      seen.add(row.taskId);
      result.push(row);
    }

    return result;
  }

  async findStudentSubmissionByTask(
    taskId: number,
    studentId: number,
  ): Promise<SubmissionReviewRepositoryResponse> {
    const [s] = await this.db
      .select()
      .from(submission)
      .where(
        and(eq(submission.taskId, taskId), eq(submission.studentId, studentId)),
      );

    if (!s) return { submission: null, reviews: [] };

    const rs = await this.db
      .select()
      .from(reviews)
      .where(eq(reviews.submissionId, s.id))
      .orderBy(desc(reviews.reviewedAt));

    return { submission: s, reviews: rs };
  }

  async findMentorSubmissionById(
    submissionId: number,
    mentorId: number,
  ): Promise<SubmissionReviewRepositoryResponse> {
    const [s] = await this.db
      .select(getTableColumns(submission))
      .from(submission)
      .innerJoin(tasks, eq(tasks.id, submission.taskId))
      .innerJoin(
        streamStudent,
        and(
          eq(streamStudent.studentId, submission.studentId),
          eq(streamStudent.streamId, tasks.streamId),
          eq(streamStudent.mentorId, mentorId),
        ),
      )
      .where(eq(submission.id, submissionId));

    if (!s) return { submission: null, reviews: [] };

    const rs = await this.db
      .select()
      .from(reviews)
      .where(eq(reviews.submissionId, s.id))
      .orderBy(desc(reviews.reviewedAt));

    return { submission: s, reviews: rs };
  }

  async findById(id: number): Promise<SubmissionDto | null> {
    const [row] = await this.db
      .select()
      .from(submission)
      .where(eq(submission.id, id));

    return row ?? null;
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

  async switchStatus(
    id: number,
    status: SubmissionStatus,
  ): Promise<SubmissionDto | null> {
    const [row] = await this.db
      .update(submission)
      .set({ status, updatedAt: new Date() })
      .where(eq(submission.id, id))
      .returning();

    return row ?? null;
  }

  async create(
    data: CreateSubmissionRepositoryPayload,
  ): Promise<SubmissionDto> {
    const [row] = await this.db.insert(submission).values(data).returning();

    if (!row) throw new Error("Ошибка при создании решения");

    return row;
  }

  async update(
    id: number,
    data: UpdateSubmissionRepositoryPayload,
  ): Promise<SubmissionDto | null> {
    const [row] = await this.db
      .update(submission)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(submission.id, id))
      .returning();

    return row ?? null;
  }
}
