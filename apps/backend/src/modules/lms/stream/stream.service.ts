import {
  StreamQuery,
  StreamResponse,
  CreateStreamPayload,
  UpdateStreamPayload,
  FinishStreamAndGraduateStudentsResponse,
  RevertStreamFinishResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { isPgError, PG } from "@repo/database";
import { IStreamService } from "./stream.types";
import { ConflictError, NotFoundError } from "@error";
import { StreamRepository } from "./stream.repository";
import { streamMap, streamsMap } from "./stream.mapper";

export class StreamService implements IStreamService {
  constructor(private streamRepo: StreamRepository) {}

  async getStreams(
    filters?: StreamQuery,
  ): Promise<PaginationResponse<StreamResponse>> {
    const ss = await this.streamRepo.findAll(filters);

    return {
      ...ss,
      data: streamsMap(ss.data),
    };
  }

  async getStream(id: number): Promise<StreamResponse | null> {
    const stream = await this.streamRepo.findById(id);

    if (!stream) throw new NotFoundError("Поток не найден");

    return streamMap(stream);
  }

  async getStreamsByStudent(studentId: number): Promise<StreamResponse[]> {
    const ss = await this.streamRepo.findByStudent(studentId);

    return streamsMap(ss);
  }

  async getStreamsByMentor(mentorId: number): Promise<StreamResponse[]> {
    const ss = await this.streamRepo.findByMentor(mentorId);

    return streamsMap(ss);
  }

  async createStream(data: CreateStreamPayload): Promise<StreamResponse> {
    try {
      const stream = await this.streamRepo.create(data);

      return streamMap(stream);
    } catch (e) {
      if (isPgError(e, PG.FK))
        throw new ConflictError("Указанный курс не существует");
      throw e;
    }
  }

  async updateStream(
    id: number,
    data: UpdateStreamPayload,
  ): Promise<StreamResponse | null> {
    try {
      const stream = await this.streamRepo.update(id, data);

      if (!stream) throw new NotFoundError("Поток не найден");

      return streamMap(stream);
    } catch (e) {
      if (isPgError(e, PG.FK))
        throw new ConflictError("Указанный курс не существует");
      throw e;
    }
  }

  async deleteStream(id: number): Promise<boolean> {
    return await this.streamRepo.delete(id);
  }

  async startStream(id: number): Promise<StreamResponse> {
    const stream = await this.streamRepo.startStream(id);

    return streamMap(stream);
  }

  async finishStreamAndGraduateStudents(
    id: number,
  ): Promise<FinishStreamAndGraduateStudentsResponse> {
    const { stream, graduatedCount } =
      await this.streamRepo.finishStreamAndGraduateStudents(id);

    return { stream: streamMap(stream), graduatedCount };
  }

  async revertStreamFinish(id: number): Promise<RevertStreamFinishResponse> {
    const { stream, graduatedCount } =
      await this.streamRepo.revertStreamFinish(id);

    return { stream: streamMap(stream), graduatedCount };
  }
}
