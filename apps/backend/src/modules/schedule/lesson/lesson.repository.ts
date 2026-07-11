import {
  LessonDto,
  CreateLessonRepositoryPayload,
  UpdateLessonRepositoryPayload,
  OverlappingLessonRepositoryPayload,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { and, count, desc, eq, lt, gt, ne } from "drizzle-orm";
import { DatabaseType, lessons } from "@repo/database";
import { ILessonRepository, LessonFilters } from "./lesson.types";

export class LessonRepository implements ILessonRepository {
  constructor(private db: DatabaseType) {}

  async findAll(
    filters: LessonFilters = {},
  ): Promise<PaginationResponse<LessonDto>> {
    const { streamId, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (streamId) conditions.push(eq(lessons.streamId, streamId));
    const where = conditions.length ? and(...conditions) : undefined;

    const [rows, totalRows] = await Promise.all([
      this.db
        .select()
        .from(lessons)
        .where(where)
        .orderBy(desc(lessons.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ value: count() }).from(lessons).where(where),
    ]);

    return {
      data: rows,
      meta: { page, limit, total: totalRows[0]?.value || 0 },
    };
  }

  async findById(id: number): Promise<LessonDto | null> {
    const [row] = await this.db
      .select()
      .from(lessons)
      .where(eq(lessons.id, id));

    if (!row) return null;

    return row;
  }

  async findOverlapping(
    addedLesson: OverlappingLessonRepositoryPayload,
    excludeLessonId?: number,
  ): Promise<LessonDto | null> {
    const conditions = [
      eq(lessons.streamId, addedLesson.streamId),
      lt(lessons.startTime, addedLesson.endTime),
      gt(lessons.endTime, addedLesson.startTime),
    ];
    if (excludeLessonId) conditions.push(ne(lessons.id, excludeLessonId));

    const [row] = await this.db
      .select()
      .from(lessons)
      .where(and(...conditions))
      .limit(1);

    return row ?? null;
  }

  async create(data: CreateLessonRepositoryPayload): Promise<LessonDto> {
    const [row] = await this.db.insert(lessons).values(data).returning();

    if (!row) throw new Error("Ошибка при создании занятия");

    return row;
  }

  async update(
    id: number,
    data: UpdateLessonRepositoryPayload,
  ): Promise<LessonDto | null> {
    const [row] = await this.db
      .update(lessons)
      .set(data)
      .where(eq(lessons.id, id))
      .returning();

    return row ?? null;
  }

  async delete(id: number): Promise<LessonDto | null> {
    const [deleted] = await this.db
      .delete(lessons)
      .where(eq(lessons.id, id))
      .returning();

    return deleted ?? null;
  }

  async markAnnounceSent(id: number): Promise<LessonDto | null> {
    const [row] = await this.db
      .update(lessons)
      .set({
        announceSentAt: new Date(),
      })
      .where(eq(lessons.id, id))
      .returning();

    if (!row) return null;

    return row;
  }

  async markReminderSent(id: number): Promise<LessonDto | null> {
    const [row] = await this.db
      .update(lessons)
      .set({
        reminderSentAt: new Date(),
      })
      .where(eq(lessons.id, id))
      .returning();

    if (!row) return null;

    return row;
  }
}
