import {
  StreamDto,
  StreamQuery,
  StreamResponse,
  CreateStreamPayload,
  UpdateStreamPayload,
  CreateStreamRepositoryPayload,
  UpdateStreamRepositoryPayload,
  RevertStreamFinishResponse,
  RevertStreamFinishRepositoryResponse,
  FinishStreamAndGraduateStudentsResponse,
  FinishStreamAndGraduateStudentsRepositoryResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IStreamRepository {
  findAll: (filters?: StreamQuery) => Promise<PaginationResponse<StreamDto>>;
  findByStudent: (studentId: number) => Promise<StreamDto[]>;
  findByMentor: (mentorId: number) => Promise<StreamDto[]>;
  findById: (id: number) => Promise<StreamDto | null>;
  create: (data: CreateStreamRepositoryPayload) => Promise<StreamDto | null>;
  update: (
    id: number,
    data: UpdateStreamRepositoryPayload,
  ) => Promise<StreamDto | null>;
  delete: (id: number) => Promise<boolean>;
  startStream: (id: number) => Promise<StreamDto>;
  finishStreamAndGraduateStudents(
    id: number,
  ): Promise<FinishStreamAndGraduateStudentsRepositoryResponse>;
  revertStreamFinish: (
    id: number,
  ) => Promise<RevertStreamFinishRepositoryResponse>;
}

export interface IStreamService {
  getStreams: (
    filters?: StreamQuery,
  ) => Promise<PaginationResponse<StreamResponse>>;
  getStream: (id: number) => Promise<StreamResponse | null>;
  getStreamsByStudent: (studentId: number) => Promise<StreamResponse[]>;
  getStreamsByMentor: (mentorId: number) => Promise<StreamResponse[]>;
  createStream: (data: CreateStreamPayload) => Promise<StreamResponse>;
  updateStream: (
    id: number,
    data: UpdateStreamPayload,
  ) => Promise<StreamResponse | null>;
  deleteStream: (id: number) => Promise<boolean>;
  startStream: (id: number) => Promise<StreamResponse>;
  finishStreamAndGraduateStudents: (
    id: number,
  ) => Promise<FinishStreamAndGraduateStudentsResponse>;
  revertStreamFinish: (id: number) => Promise<RevertStreamFinishResponse>;
}

export interface IStreamController {
  getAll: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getById: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getMyStudentStreams: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  getMyMentorStreams: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  update: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  delete: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  startStream: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  finishStreamAndGraduateStudents: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  revertStreamFinish: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
}

export interface IStreamGuard {
  assertMutable: (streamId: number) => Promise<void>;
  assertActive: (streamId: number) => Promise<void>;
  streamIdByTask: (taskId: number) => Promise<number>;
  streamIdBySubmission: (submissionId: number) => Promise<number>;
}
