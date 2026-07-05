import { PaginationResponse } from "@types";
import { StreamGuard } from "../stream.guard";
import { isPgError, PG } from "@repo/database";
import { ConflictError, NotFoundError } from "@error";
import { IStreamMentorService } from "./stream-mentor.types";
import { StreamMentorRepository } from "./stream-mentor.repository";
import { streamMentorMap, streamMentorsMap } from "./stream-mentor.mapper";
import { StreamMentorQuery, StreamMentorWithUserResponse } from "@repo/schemas";

export class StreamMentorService implements IStreamMentorService {
  constructor(
    private streamMentorRepo: StreamMentorRepository,
    private streamGuard: StreamGuard,
  ) {}

  async getMentors(
    streamId: number,
    filters?: StreamMentorQuery,
  ): Promise<PaginationResponse<StreamMentorWithUserResponse>> {
    const mentors = await this.streamMentorRepo.findMentors(streamId, filters);

    return {
      ...mentors,
      data: streamMentorsMap(mentors.data),
    };
  }

  async addMentor(
    streamId: number,
    mentorId: number,
  ): Promise<StreamMentorWithUserResponse> {
    await this.streamGuard.assertMutable(streamId);

    try {
      const mentor = await this.streamMentorRepo.addMentor(streamId, mentorId);
      if (!mentor) throw new Error("Ошибка при добавлении ментора в поток");

      return streamMentorMap(mentor);
    } catch (e) {
      if (isPgError(e, PG.UNIQUE))
        throw new ConflictError("Ментор уже привязан к потоку");
      if (isPgError(e, PG.FK))
        throw new ConflictError("Поток или ментор не существует");
      throw e;
    }
  }

  async deleteMentor(streamId: number, mentorId: number): Promise<boolean> {
    await this.streamGuard.assertMutable(streamId);

    const deleted = await this.streamMentorRepo.deleteMentor(
      streamId,
      mentorId,
    );

    if (!deleted) throw new NotFoundError("Ментор не привязан к потоку");

    return deleted;
  }
}
