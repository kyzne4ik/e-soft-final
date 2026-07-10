import {
  StudentStatus,
  StreamStudentQuery,
  StreamStudentWithUserDto,
  StreamStudentWithUserResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IStreamStudentRepository {
  findStudents: (
    streamId: number,
    filters?: StreamStudentQuery,
  ) => Promise<PaginationResponse<StreamStudentWithUserDto>>;
  addStudent: (
    streamId: number,
    studentId: number,
    mentorId?: number | null,
  ) => Promise<StreamStudentWithUserDto | null>;
  changeMentor: (
    streamId: number,
    studentId: number,
    newMentorId: number,
  ) => Promise<StreamStudentWithUserDto | null>;
  updateStatus: (
    streamId: number,
    studentId: number,
    newStatus: StudentStatus,
  ) => Promise<StreamStudentWithUserDto | null>;
  deleteStudent: (studentId: number, streamId: number) => Promise<boolean>;
}

export interface IStreamStudentService {
  getStudents: (
    streamId: number,
    filters?: StreamStudentQuery,
  ) => Promise<PaginationResponse<StreamStudentWithUserResponse>>;
  addStudent: (
    streamId: number,
    studentId: number,
    mentorId?: number | null,
  ) => Promise<StreamStudentWithUserResponse>;
  changeMentor: (
    streamId: number,
    studentId: number,
    newMentorId: number,
  ) => Promise<StreamStudentWithUserResponse | null>;
  updateStatus: (
    streamId: number,
    studentId: number,
    newStatus: StudentStatus,
  ) => Promise<StreamStudentWithUserResponse | null>;
  deleteStudent: (studentId: number, streamId: number) => Promise<boolean>;
}

export interface IStreamStudentController {
  getStudents: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  addStudent: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  changeMentor: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  updateStatus: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  deleteStudent: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
}
