import { and, eq } from "drizzle-orm";
import { ForbiddenError, NotFoundError } from "@error";
import { DatabaseType, streamStudent, tasks, submission } from "@repo/database";
import { ISubmissionGuard } from "./submission.types";

export class SubmissionGuard implements ISubmissionGuard {
  constructor(private db: DatabaseType) {}

  async assertStudentEnrolled(
    taskId: number,
    studentId: number,
  ): Promise<{ streamId: number }> {
    const [row] = await this.db
      .select({
        streamId: tasks.streamId,
        enrolledId: streamStudent.studentId,
      })
      .from(tasks)
      .leftJoin(
        streamStudent,
        and(
          eq(streamStudent.streamId, tasks.streamId),
          eq(streamStudent.studentId, studentId),
          eq(streamStudent.status, "ACTIVE"),
        ),
      )
      .where(eq(tasks.id, taskId))
      .limit(1);

    if (!row) throw new NotFoundError("Задание не найдено");
    if (row.enrolledId === null)
      throw new ForbiddenError("Вы не зачислены в этот поток");

    return { streamId: row.streamId };
  }

  async assertMentorOfSubmission(
    mentorId: number,
    submissionId: number,
  ): Promise<{ streamId: number }> {
    const [row] = await this.db
      .select({ streamId: tasks.streamId })
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
      .where(eq(submission.id, submissionId))
      .limit(1);

    if (!row) throw new ForbiddenError("Студент не закреплён за вами");

    return { streamId: row.streamId };
  }

  async assertOwnSubmission(
    studentId: number,
    submissionId: number,
  ): Promise<{ streamId: number }> {
    const [row] = await this.db
      .select({ streamId: tasks.streamId })
      .from(submission)
      .innerJoin(tasks, eq(tasks.id, submission.taskId))
      .where(
        and(
          eq(submission.id, submissionId),
          eq(submission.studentId, studentId),
        ),
      )
      .limit(1);

    if (!row) throw new ForbiddenError("Нельзя трогать чужое решение");

    return { streamId: row.streamId };
  }
}
