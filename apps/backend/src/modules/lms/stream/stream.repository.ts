import {
  StreamDto,
  StreamQuery,
  CreateStreamRepositoryPayload,
  UpdateStreamRepositoryPayload,
  RevertStreamFinishRepositoryResponse,
  FinishStreamAndGraduateStudentsRepositoryResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { and, count, desc, eq } from "drizzle-orm";
import { StringToolKit } from "@utils/string";
import { IStreamRepository } from "./stream.types";
import {
  streams,
  DatabaseType,
  streamStudent,
  streamMentor,
} from "@repo/database";

export class StreamRepository implements IStreamRepository {
  constructor(private db: DatabaseType) {}

  async findAll(
    filters: StreamQuery = {},
  ): Promise<PaginationResponse<StreamDto>> {
    const { courseId, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (courseId) conditions.push(eq(streams.courseId, courseId));
    const where = conditions.length ? and(...conditions) : undefined;

    const [data, totalRows] = await Promise.all([
      this.db
        .select()
        .from(streams)
        .where(where)
        .offset(offset)
        .limit(limit)
        .orderBy(desc(streams.createdAt)),
      this.db.select({ value: count() }).from(streams).where(where),
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

  async findByStudent(studentId: number): Promise<StreamDto[]> {
    return await this.db
      .select({
        id: streams.id,
        name: streams.name,
        courseId: streams.courseId,
        status: streams.status,
        createdAt: streams.createdAt,
        updatedAt: streams.updatedAt,
      })
      .from(streamStudent)
      .innerJoin(streams, eq(streams.id, streamStudent.streamId))
      .where(eq(streamStudent.studentId, studentId))
      .orderBy(desc(streams.createdAt));
  }

  async findByMentor(mentorId: number): Promise<StreamDto[]> {
    return await this.db
      .select({
        id: streams.id,
        name: streams.name,
        courseId: streams.courseId,
        status: streams.status,
        createdAt: streams.createdAt,
        updatedAt: streams.updatedAt,
      })
      .from(streamMentor)
      .innerJoin(streams, eq(streams.id, streamMentor.streamId))
      .where(eq(streamMentor.mentorId, mentorId))
      .orderBy(desc(streams.createdAt));
  }

  async findById(id: number): Promise<StreamDto | null> {
    const [row] = await this.db
      .select()
      .from(streams)
      .where(eq(streams.id, id));

    if (!row) return null;

    return row;
  }

  async create(data: CreateStreamRepositoryPayload): Promise<StreamDto> {
    const [row] = await this.db.insert(streams).values(data).returning();

    if (!row) throw new Error("Ошибка при создании потока");

    return row;
  }

  async update(
    id: number,
    data: UpdateStreamRepositoryPayload,
  ): Promise<StreamDto | null> {
    const [row] = await this.db
      .update(streams)
      .set(data)
      .where(eq(streams.id, id))
      .returning();

    if (!row) return null;

    return row;
  }

  async delete(id: number): Promise<boolean> {
    const deleted = await this.db
      .delete(streams)
      .where(eq(streams.id, id))
      .returning({ id: streams.id });

    return deleted.length > 0;
  }

  async startStream(id: number): Promise<StreamDto> {
    return await this.db.transaction(async (tx) => {
      const [stream] = await tx
        .select()
        .from(streams)
        .where(eq(streams.id, id));

      if (!stream) throw new Error("Поток не найден");

      if (stream.status !== "ENROLLING") {
        throw new Error(
          StringToolKit.compose([
            `Невозможно запустить поток со статусом ${stream.status}.`,
            "Статус должен быть ENROLLING",
          ]),
        );
      }

      const [ss] = await tx
        .update(streams)
        .set({
          status: "IN_PROGRESS",
          updatedAt: new Date(),
        })
        .where(eq(streams.id, id))
        .returning();

      if (!ss) throw new Error("Ошибка при обновлении статуса потока");

      return ss;
    });
  }

  async finishStreamAndGraduateStudents(
    id: number,
  ): Promise<FinishStreamAndGraduateStudentsRepositoryResponse> {
    return await this.db.transaction(async (tx) => {
      const [stream] = await tx
        .select()
        .from(streams)
        .where(eq(streams.id, id));

      if (!stream) throw new Error("Поток не найден");

      if (stream.status !== "IN_PROGRESS") {
        throw new Error(
          StringToolKit.compose([
            `Невозможно завершить поток со статусом ${stream.status}.`,
            "Статус должен быть IN_PROGRESS",
          ]),
        );
      }

      const [ss] = await tx
        .update(streams)
        .set({
          status: "FINISHED",
          updatedAt: new Date(),
        })
        .where(eq(streams.id, id))
        .returning();

      if (!ss) throw new Error("Ошибка при обновлении статуса потока");

      const graduated = await tx
        .update(streamStudent)
        .set({
          status: "GRADUATED",
        })
        .where(
          and(
            eq(streamStudent.streamId, id),
            eq(streamStudent.status, "ACTIVE"),
          ),
        )
        .returning();

      return {
        stream: ss,
        graduatedCount: graduated.length,
      };
    });
  }

  async revertStreamFinish(
    id: number,
  ): Promise<RevertStreamFinishRepositoryResponse> {
    return await this.db.transaction(async (tx) => {
      const [stream] = await tx
        .select()
        .from(streams)
        .where(eq(streams.id, id));

      if (!stream) throw new Error("Поток не найден");

      if (stream.status !== "FINISHED") {
        throw new Error(
          StringToolKit.compose([
            `Невозможно завершить поток со статусом ${stream.status}.`,
            "Статус должен быть FINISHED",
          ]),
        );
      }

      const [ss] = await tx
        .update(streams)
        .set({
          status: "IN_PROGRESS",
          updatedAt: new Date(),
        })
        .where(eq(streams.id, id))
        .returning();

      if (!ss) throw new Error("Ошибка при обновлении статуса потока");

      const graduated = await tx
        .update(streamStudent)
        .set({
          status: "ACTIVE",
        })
        .where(
          and(
            eq(streamStudent.streamId, id),
            eq(streamStudent.status, "GRADUATED"),
          ),
        )
        .returning();

      return {
        stream: ss,
        graduatedCount: graduated.length,
      };
    });
  }
}
