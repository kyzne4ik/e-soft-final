import {
  users,
  streamMentor,
  DatabaseType,
  mentorProfile,
} from "@repo/database";
import { PaginationResponse } from "@types";
import { count, eq, and } from "drizzle-orm";
import { IStreamMentorRepository } from "./stream-mentor.types";
import { StreamMentorQuery, StreamMentorWithUserDto } from "@repo/schemas";

export class StreamMentorRepository implements IStreamMentorRepository {
  constructor(private db: DatabaseType) {}

  async findMentors(
    streamId: number,
    filters: StreamMentorQuery = {},
  ): Promise<PaginationResponse<StreamMentorWithUserDto>> {
    const { page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const [data, totalRows] = await Promise.all([
      this.db
        .select({
          streamId: streamMentor.streamId,
          mentorId: streamMentor.mentorId,
          joinedAt: streamMentor.joinedAt,
          userId: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          patronymic: users.patronymic,
          email: users.email,
          role: users.role,
        })
        .from(streamMentor)
        .leftJoin(mentorProfile, eq(mentorProfile.userId, users.id))
        .leftJoin(users, eq(users.id, streamMentor.mentorId))
        .where(eq(streamMentor.streamId, streamId))
        .limit(limit)
        .offset(offset),
      this.db
        .select({ value: count() })
        .from(streamMentor)
        .where(eq(streamMentor.streamId, streamId)),
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

  async addMentor(
    streamId: number,
    mentorId: number,
  ): Promise<StreamMentorWithUserDto | null> {
    return await this.db.transaction(async (tx) => {
      const [row] = await tx
        .insert(streamMentor)
        .values({
          streamId,
          mentorId,
          joinedAt: new Date(),
        })
        .returning();

      if (!row) throw new Error("Ошибка при добавлении ментора в поток");

      const [sm] = await tx
        .select({
          streamId: streamMentor.streamId,
          mentorId: streamMentor.mentorId,
          joinedAt: streamMentor.joinedAt,
          userId: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          patronymic: users.patronymic,
          email: users.email,
          role: users.role,
        })
        .from(streamMentor)
        .leftJoin(mentorProfile, eq(mentorProfile.userId, users.id))
        .leftJoin(users, eq(users.id, streamMentor.mentorId))
        .where(
          and(
            eq(streamMentor.streamId, streamId),
            eq(streamMentor.mentorId, mentorId),
          ),
        );

      return sm ?? null;
    });
  }

  async deleteMentor(streamId: number, mentorId: number): Promise<boolean> {
    const deleted = await this.db
      .delete(streamMentor)
      .where(
        and(
          eq(streamMentor.streamId, streamId),
          eq(streamMentor.mentorId, mentorId),
        ),
      )
      .returning({ id: streamMentor.streamId });

    return deleted.length > 0;
  }
}
