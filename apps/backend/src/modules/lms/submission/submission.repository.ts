import {
  tasks,
  users,
  reviews,
  submission,
  DatabaseType,
  mentorProfile,
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
  MentorSubmissionRow,
  MentorSubmissionDetailRow,
  SubmissionReviewRepositoryResponse,
  MentorJournalDbRow,
} from "./submission.types";
import { PaginationResponse } from "@types";
import { and, asc, count, desc, eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export class SubmissionRepository implements ISubmissionRepository {
  constructor(private db: DatabaseType) {}

  async findMentorSubmissions(
    mentorId: number,
    filters: SubmissionMentorQuery = {},
  ): Promise<PaginationResponse<MentorSubmissionRow>> {
    const {
      streamId,
      taskId,
      studentId,
      status,
      page = 1,
      limit = 20,
    } = filters;
    const offset = (page - 1) * limit;

    const conditions = [eq(streamStudent.mentorId, mentorId)];
    if (streamId !== undefined) conditions.push(eq(tasks.streamId, streamId));
    if (taskId !== undefined) conditions.push(eq(submission.taskId, taskId));
    if (studentId !== undefined)
      conditions.push(eq(submission.studentId, studentId));
    if (status !== undefined) conditions.push(eq(submission.status, status));
    const where = and(...conditions);

    const [data, totalRows] = await Promise.all([
      this.db
        .select({
          id: submission.id,
          taskId: submission.taskId,
          studentId: submission.studentId,
          streamId: tasks.streamId,
          repoLink: submission.repoLink,
          status: submission.status,
          createdAt: submission.createdAt,
          studentFirstName: users.firstName,
          studentLastName: users.lastName,
          taskTitle: tasks.title,
          taskDeadline: tasks.deadline,
        })
        .from(submission)
        .innerJoin(tasks, eq(tasks.id, submission.taskId))
        .innerJoin(
          streamStudent,
          and(
            eq(streamStudent.studentId, submission.studentId),
            eq(streamStudent.streamId, tasks.streamId),
          ),
        )
        .innerJoin(studentProfile, eq(studentProfile.id, submission.studentId))
        .innerJoin(users, eq(users.id, studentProfile.userId))
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
      .select({
        id: reviews.id,
        submissionId: reviews.submissionId,
        mentorId: reviews.mentorId,
        score: reviews.score,
        comment: reviews.comment,
        reviewedAt: reviews.reviewedAt,
        mentorFirstName: users.firstName,
        mentorLastName: users.lastName,
      })
      .from(reviews)
      .innerJoin(mentorProfile, eq(mentorProfile.id, reviews.mentorId))
      .innerJoin(users, eq(users.id, mentorProfile.userId))
      .where(eq(reviews.submissionId, s.id))
      .orderBy(desc(reviews.reviewedAt));

    return { submission: s, reviews: rs };
  }

  async findMentorSubmissionById(
    submissionId: number,
    mentorId: number,
  ): Promise<MentorSubmissionDetailRow> {
    const [s] = await this.db
      .select({
        id: submission.id,
        taskId: submission.taskId,
        studentId: submission.studentId,
        streamId: tasks.streamId,
        repoLink: submission.repoLink,
        status: submission.status,
        createdAt: submission.createdAt,
        studentFirstName: users.firstName,
        studentLastName: users.lastName,
        taskTitle: tasks.title,
        taskDeadline: tasks.deadline,
        taskDescription: tasks.description,
      })
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
      .innerJoin(studentProfile, eq(studentProfile.id, submission.studentId))
      .innerJoin(users, eq(users.id, studentProfile.userId))
      .where(eq(submission.id, submissionId));

    if (!s) return { submission: null, reviews: [] };

    const rs = await this.db
      .select({
        id: reviews.id,
        submissionId: reviews.submissionId,
        mentorId: reviews.mentorId,
        score: reviews.score,
        comment: reviews.comment,
        reviewedAt: reviews.reviewedAt,
        mentorFirstName: users.firstName,
        mentorLastName: users.lastName,
      })
      .from(reviews)
      .innerJoin(mentorProfile, eq(mentorProfile.id, reviews.mentorId))
      .innerJoin(users, eq(users.id, mentorProfile.userId))
      .where(eq(reviews.submissionId, s.id))
      .orderBy(asc(reviews.reviewedAt));

    return { submission: s, reviews: rs };
  }

  async findMentorJournal(
    mentorId: number,
    streamId: number,
  ): Promise<MentorJournalDbRow[]> {
    const rows = await this.db.execute<{
      student_id: number;
      student_user_id: number;
      student_first_name: string | null;
      student_last_name: string | null;
      student_status: "ACTIVE" | "GRADUATED" | "EXPELLED";
      total_tasks: string;
      submitted_tasks: string;
      accepted_tasks: string;
      average_score: string | null;
      last_activity_at: Date | null;
    }>(sql`
      SELECT
        ss.student_id,
        u.id          AS student_user_id,
        u.first_name  AS student_first_name,
        u.last_name   AS student_last_name,
        ss.status     AS student_status,
        (SELECT COUNT(*) FROM tasks t WHERE t.stream_id = ${streamId})::int AS total_tasks,
        COUNT(DISTINCT sub.id)::int AS submitted_tasks,
        COUNT(DISTINCT CASE WHEN sub.status = 'ACCEPTED' THEN sub.id END)::int AS accepted_tasks,
        ROUND(AVG(r.score)::numeric, 1) AS average_score,
        MAX(sub.created_at) AS last_activity_at
      FROM stream_student ss
      JOIN student_profile sp ON sp.id = ss.student_id
      JOIN users u ON u.id = sp.user_id
      LEFT JOIN submission sub
        ON sub.student_id = ss.student_id
        AND sub.task_id IN (SELECT id FROM tasks WHERE stream_id = ${streamId})
      LEFT JOIN reviews r ON r.submission_id = sub.id
      WHERE ss.stream_id = ${streamId}
        AND ss.mentor_id = ${mentorId}
      GROUP BY ss.student_id, ss.status, u.id, u.first_name, u.last_name
      ORDER BY u.last_name, u.first_name
    `);

    return rows.rows.map((r) => ({
      studentId: r.student_id,
      studentUserId: r.student_user_id,
      studentFirstName: r.student_first_name,
      studentLastName: r.student_last_name,
      studentStatus: r.student_status,
      totalTasks: Number(r.total_tasks),
      submittedTasks: Number(r.submitted_tasks),
      acceptedTasks: Number(r.accepted_tasks),
      averageScore: r.average_score != null ? Number(r.average_score) : null,
      lastActivityAt: r.last_activity_at ?? null,
    }));
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

  async findMentorUserIdBySubmission(
    submissionId: number,
  ): Promise<number | null> {
    const [row] = await this.db
      .select({ userId: users.id })
      .from(submission)
      .innerJoin(
        streamStudent,
        eq(streamStudent.studentId, submission.studentId),
      )
      .innerJoin(mentorProfile, eq(mentorProfile.id, streamStudent.mentorId))
      .innerJoin(users, eq(users.id, mentorProfile.userId))
      .where(eq(submission.id, submissionId))
      .limit(1);

    return row?.userId ?? null;
  }

  async findMentorNotificationContext(submissionId: number): Promise<{
    mentorUserId: number;
    studentFirstName: string | null;
    studentLastName: string | null;
    taskTitle: string;
  } | null> {
    const studentUsers = alias(users, "student_users");
    const mentorUsers = alias(users, "mentor_users");

    const [row] = await this.db
      .select({
        mentorUserId: mentorUsers.id,
        studentFirstName: studentUsers.firstName,
        studentLastName: studentUsers.lastName,
        taskTitle: tasks.title,
      })
      .from(submission)
      .innerJoin(tasks, eq(tasks.id, submission.taskId))
      .innerJoin(studentProfile, eq(studentProfile.id, submission.studentId))
      .innerJoin(studentUsers, eq(studentUsers.id, studentProfile.userId))
      .innerJoin(
        streamStudent,
        and(
          eq(streamStudent.studentId, submission.studentId),
          eq(streamStudent.streamId, tasks.streamId),
        ),
      )
      .innerJoin(mentorProfile, eq(mentorProfile.id, streamStudent.mentorId))
      .innerJoin(mentorUsers, eq(mentorUsers.id, mentorProfile.userId))
      .where(eq(submission.id, submissionId))
      .limit(1);

    return row ?? null;
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
