import {
  StudentStatus,
  StreamStudentQuery,
  StreamStudentWithUserDto,
} from "@repo/schemas";
import {
  users,
  DatabaseType,
  streamStudent,
  studentProfile,
} from "@repo/database";
import { PaginationResponse } from "@types";
import { count, eq, and } from "drizzle-orm";
import { IStreamStudentRepository } from "./stream-student.types";

const studentWithUserFields = {
  streamId: streamStudent.streamId,
  studentId: streamStudent.studentId,
  mentorId: streamStudent.mentorId,
  status: streamStudent.status,
  joinedAt: streamStudent.joinedAt,
  userId: users.id,
  firstName: users.firstName,
  lastName: users.lastName,
  patronymic: users.patronymic,
  email: users.email,
  role: users.role,
} as const;

export class StreamStudentRepository implements IStreamStudentRepository {
  constructor(private db: DatabaseType) {}

  async findStudents(
    streamId: number,
    filters: StreamStudentQuery = {},
  ): Promise<PaginationResponse<StreamStudentWithUserDto>> {
    const { mentorId, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [eq(streamStudent.streamId, streamId)];
    if (mentorId) conditions.push(eq(streamStudent.mentorId, mentorId));
    const where = conditions.length ? and(...conditions) : undefined;

    const [data, totalRows] = await Promise.all([
      this.db
        .select(studentWithUserFields)
        .from(streamStudent)
        .leftJoin(
          studentProfile,
          eq(studentProfile.id, streamStudent.studentId),
        )
        .leftJoin(users, eq(users.id, studentProfile.userId))
        .where(where)
        .limit(limit)
        .offset(offset),
      this.db
        .select({ value: count() })
        .from(streamStudent)
        .where(eq(streamStudent.streamId, streamId)),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total: totalRows[0]?.value || 0,
      },
    };
  }

  async addStudent(
    streamId: number,
    studentId: number,
    mentorId: number | null = null,
  ): Promise<StreamStudentWithUserDto | null> {
    return await this.db.transaction(async (tx) => {
      const [row] = await tx
        .insert(streamStudent)
        .values({
          streamId,
          studentId,
          mentorId,
          status: "ACTIVE",
          joinedAt: new Date(),
        })
        .returning({ id: streamStudent.streamId });

      if (!row)
        throw new Error("Ошибка при добавлении студента в streamStudent");

      const [ss] = await tx
        .select(studentWithUserFields)
        .from(streamStudent)
        .leftJoin(
          studentProfile,
          eq(studentProfile.id, streamStudent.studentId),
        )
        .leftJoin(users, eq(users.id, studentProfile.userId))
        .where(
          and(
            eq(streamStudent.streamId, streamId),
            eq(streamStudent.studentId, studentId),
          ),
        );

      return ss ?? null;
    });
  }

  async changeMentor(
    streamId: number,
    studentId: number,
    newMentorId: number,
  ): Promise<StreamStudentWithUserDto | null> {
    return await this.db.transaction(async (tx) => {
      const [row] = await tx
        .update(streamStudent)
        .set({ mentorId: newMentorId })
        .where(
          and(
            eq(streamStudent.streamId, streamId),
            eq(streamStudent.studentId, studentId),
          ),
        )
        .returning({ id: streamStudent.streamId });

      if (!row)
        throw new Error("Ошибка при обновлении поля ментора в streamStudent");

      const [ss] = await tx
        .select(studentWithUserFields)
        .from(streamStudent)
        .leftJoin(
          studentProfile,
          eq(studentProfile.id, streamStudent.studentId),
        )
        .leftJoin(users, eq(users.id, studentProfile.userId))
        .where(
          and(
            eq(streamStudent.streamId, streamId),
            eq(streamStudent.studentId, studentId),
            eq(streamStudent.mentorId, newMentorId),
          ),
        );

      return ss ?? null;
    });
  }

  async updateStatus(
    streamId: number,
    studentId: number,
    newStatus: StudentStatus,
  ): Promise<StreamStudentWithUserDto | null> {
    return await this.db.transaction(async (tx) => {
      const [row] = await tx
        .update(streamStudent)
        .set({ status: newStatus })
        .where(
          and(
            eq(streamStudent.streamId, streamId),
            eq(streamStudent.studentId, studentId),
          ),
        )
        .returning({ id: streamStudent.streamId });

      if (!row)
        throw new Error("Ошибка при обновлении поля статуса в streamStudent");

      const [ss] = await tx
        .select(studentWithUserFields)
        .from(streamStudent)
        .leftJoin(
          studentProfile,
          eq(studentProfile.id, streamStudent.studentId),
        )
        .leftJoin(users, eq(users.id, studentProfile.userId))
        .where(
          and(
            eq(streamStudent.streamId, streamId),
            eq(streamStudent.studentId, studentId),
          ),
        );

      return ss ?? null;
    });
  }

  async deleteStudent(streamId: number, studentId: number): Promise<boolean> {
    const deleted = await this.db
      .delete(streamStudent)
      .where(
        and(
          eq(streamStudent.streamId, streamId),
          eq(streamStudent.studentId, studentId),
        ),
      )
      .returning({ id: streamStudent.streamId });

    return deleted.length > 0;
  }
}
