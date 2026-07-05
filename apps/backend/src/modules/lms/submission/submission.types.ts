import type {
  ReviewDto,
  ReviewResponse,
  StreamStatus,
  SubmissionDto,
  SubmissionStatus,
  SubmissionResponse,
  CreateSubmissionPayload,
  UpdateSubmissionPayload,
  CreateSubmissionRepositoryPayload,
  UpdateSubmissionRepositoryPayload,
  StudentPerformanceRow,
  StudentPerformanceResponse,
  SubmissionMentorQuery,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export type SubmissionEligibility = {
  streamStatus: StreamStatus;
  enrolled: boolean;
};

export type SubmissionReviewRepositoryResponse = {
  submission: SubmissionDto | null;
  reviews: ReviewDto[];
};

export type SubmissionReviewResponse = {
  submission: SubmissionResponse | null;
  reviews: ReviewResponse[];
};

export interface ISubmissionRepository {
  findStudentPerformance: (
    streamId: number,
    studentId: number,
  ) => Promise<StudentPerformanceRow[]>;
  findStudentSubmissionByTask: (
    taskId: number,
    studentId: number,
  ) => Promise<SubmissionReviewRepositoryResponse>;
  findMentorSubmissions: (
    mentorId: number,
    filters?: SubmissionMentorQuery,
  ) => Promise<PaginationResponse<SubmissionDto>>;
  findMentorSubmissionById: (
    submissionId: number,
    mentorId: number,
  ) => Promise<SubmissionReviewRepositoryResponse>;
  findById: (id: number) => Promise<SubmissionDto | null>;
  findStudentUserId: (submissionId: number) => Promise<number | null>;
  switchStatus: (
    submissionId: number,
    status: SubmissionStatus,
  ) => Promise<SubmissionDto | null>;
  create: (data: CreateSubmissionRepositoryPayload) => Promise<SubmissionDto>;
  update: (
    id: number,
    data: UpdateSubmissionRepositoryPayload,
  ) => Promise<SubmissionDto | null>;
}

export interface ISubmissionService {
  getMentorSubmissions: (
    mentorId: number,
    filters?: SubmissionMentorQuery,
  ) => Promise<PaginationResponse<SubmissionResponse>>;
  getStudentPerformance: (
    streamId: number,
    studentId: number,
  ) => Promise<StudentPerformanceResponse>;
  getStudentSubmissionByTask: (
    taskId: number,
    studentId: number,
  ) => Promise<SubmissionReviewResponse>;
  getMentorSubmissionById: (
    submissionId: number,
    mentorId: number,
  ) => Promise<SubmissionReviewResponse>;
  getSubmission: (id: number) => Promise<SubmissionResponse | null>;
  switchStatusSubmission: (
    studentId: number,
    submissionId: number,
    status: SubmissionStatus,
  ) => Promise<SubmissionResponse | null>;
  createSubmission: (
    studentId: number,
    data: CreateSubmissionPayload,
  ) => Promise<SubmissionResponse>;
  updateSubmission: (
    studentId: number,
    submissionId: number,
    data: UpdateSubmissionPayload,
  ) => Promise<SubmissionResponse | null>;
}

export interface ISubmissionController {
  getMentorSubmissions: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  getStudentPerformance: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  getStudentSubmissionByTask: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  getMentorSubmissionById: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  getById: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  switchStatus: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  update: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}

export interface ISubmissionGuard {
  assertStudentEnrolled: (
    taskId: number,
    studentId: number,
  ) => Promise<{ streamId: number }>;
  assertMentorOfSubmission: (
    mentorId: number,
    submissionId: number,
  ) => Promise<{ streamId: number }>;
  assertOwnSubmission: (
    studentId: number,
    submissionId: number,
  ) => Promise<{ streamId: number }>;
}
