import {
  TaskDto,
  TaskQuery,
  CreateTaskRepositoryPayload,
  UpdateTaskRepositoryPayload,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { ITaskRepository } from "./task.types";
import { and, count, desc, eq } from "drizzle-orm";
import { DatabaseType, tasks } from "@repo/database";

export class TaskRepository implements ITaskRepository {
  constructor(private db: DatabaseType) {}

  async findAll(filters: TaskQuery = {}): Promise<PaginationResponse<TaskDto>> {
    const { streamId, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (streamId !== undefined) conditions.push(eq(tasks.streamId, streamId));
    const where = conditions.length ? and(...conditions) : undefined;

    const [data, totalRows] = await Promise.all([
      this.db
        .select()
        .from(tasks)
        .where(where)
        .orderBy(desc(tasks.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ value: count() }).from(tasks).where(where),
    ]);

    return {
      data,
      meta: { page, limit, total: totalRows[0]?.value || 0 },
    };
  }

  async findById(id: number): Promise<TaskDto | null> {
    const [row] = await this.db.select().from(tasks).where(eq(tasks.id, id));

    return row ?? null;
  }

  async create(data: CreateTaskRepositoryPayload): Promise<TaskDto> {
    const [row] = await this.db.insert(tasks).values(data).returning();

    if (!row) throw new Error("Ошибка при создании задачи");

    return row;
  }

  async update(
    id: number,
    data: UpdateTaskRepositoryPayload,
  ): Promise<TaskDto | null> {
    const [row] = await this.db
      .update(tasks)
      .set(data)
      .where(eq(tasks.id, id))
      .returning();

    return row ?? null;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.db
      .delete(tasks)
      .where(eq(tasks.id, id))
      .returning({ id: tasks.id });

    return deleted.length > 0;
  }
}
