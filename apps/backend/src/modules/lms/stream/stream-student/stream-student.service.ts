import {
  StudentStatus,
  StreamStudentQuery,
  StreamStudentWithUserResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { StreamGuard } from "../stream.guard";
import { isPgError, PG } from "@repo/database";
import { ConflictError } from "@error/conflict.error";
import { NotFoundError } from "@error/not-found.error";
import { IStreamStudentService } from "./stream-student.types";
import { StreamStudentRepository } from "./stream-student.repository";
import { streamStudentMap, streamStudentsMap } from "./stream-student.mapper";

export class StreamStudentService implements IStreamStudentService {
  constructor(
    private streamStudentRepo: StreamStudentRepository,
    private streamGuard: StreamGuard,
  ) {}

  async getStudents(
    streamId: number,
    filters?: StreamStudentQuery,
  ): Promise<PaginationResponse<StreamStudentWithUserResponse>> {
    const students = await this.streamStudentRepo.findStudents(
      streamId,
      filters,
    );

    return {
      ...students,
      data: streamStudentsMap(students.data),
    };
  }

  async addStudent(
    streamId: number,
    studentId: number,
    mentorId: number,
  ): Promise<StreamStudentWithUserResponse> {
    await this.streamGuard.assertMutable(streamId);

    try {
      const student = await this.streamStudentRepo.addStudent(
        streamId,
        studentId,
        mentorId,
      );
      if (!student) throw new Error("Ошибка при добавлении студента в поток");

      return streamStudentMap(student);
    } catch (e) {
      if (isPgError(e, PG.UNIQUE))
        throw new ConflictError("Студент уже добавлен в поток");
      if (isPgError(e, PG.FK))
        throw new ConflictError("Поток, студент или ментор не существует");
      throw e;
    }
  }

  async changeMentor(
    streamId: number,
    studentId: number,
    newMentorId: number,
  ): Promise<StreamStudentWithUserResponse> {
    await this.streamGuard.assertMutable(streamId);

    try {
      const student = await this.streamStudentRepo.changeMentor(
        streamId,
        studentId,
        newMentorId,
      );
      if (!student) throw new NotFoundError("Студент не найден в потоке");

      return streamStudentMap(student);
    } catch (e) {
      if (isPgError(e, PG.FK))
        throw new ConflictError("Указанный ментор не существует");
      throw e;
    }
  }

  async updateStatus(
    streamId: number,
    studentId: number,
    newStatus: StudentStatus,
  ): Promise<StreamStudentWithUserResponse> {
    await this.streamGuard.assertMutable(streamId);

    const student = await this.streamStudentRepo.updateStatus(
      streamId,
      studentId,
      newStatus,
    );

    if (!student) throw new NotFoundError("Студент не найден в потоке");

    return streamStudentMap(student);
  }

  async deleteStudent(streamId: number, studentId: number): Promise<boolean> {
    await this.streamGuard.assertMutable(streamId);

    const deleted = await this.streamStudentRepo.deleteStudent(
      streamId,
      studentId,
    );

    if (!deleted) throw new NotFoundError("Студент не найден в потоке");

    return deleted;
  }
}
