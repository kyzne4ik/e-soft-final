import {
  CourseDto,
  CreateCourseRepositoryPayload,
  UpdateCourseRepositoryPayload,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { count, desc, eq } from "drizzle-orm";
import { DatabaseType, courses } from "@repo/database";
import { ICourseRepository, CourseFilters } from "./course.types";

export class CourseRepository implements ICourseRepository {
  constructor(private db: DatabaseType) {}

  async findAll(
    filters: CourseFilters = {},
  ): Promise<PaginationResponse<CourseDto>> {
    const { page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const [rows, totalRows] = await Promise.all([
      this.db
        .select()
        .from(courses)
        .orderBy(desc(courses.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ value: count() }).from(courses),
    ]);

    return {
      data: rows,
      meta: { page, limit, total: totalRows[0]?.value || 0 },
    };
  }

  async findById(id: number): Promise<CourseDto | null> {
    const [row] = await this.db
      .select()
      .from(courses)
      .where(eq(courses.id, id));

    return row ?? null;
  }

  async create(data: CreateCourseRepositoryPayload): Promise<CourseDto> {
    const [row] = await this.db.insert(courses).values(data).returning();

    if (!row) throw new Error("Ошибка при создании курса");

    return row;
  }

  async update(
    id: number,
    data: UpdateCourseRepositoryPayload,
  ): Promise<CourseDto | null> {
    const [row] = await this.db
      .update(courses)
      .set(data)
      .where(eq(courses.id, id))
      .returning();

    return row ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.db
      .delete(courses)
      .where(eq(courses.id, id))
      .returning({ id: courses.id });

    return deleted.length > 0;
  }
}
