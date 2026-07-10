import type {
  ReviewDto,
  StreamStatus,
  SubmissionDto,
  SubmissionStatus,
  SubmissionResponse,
  SubmissionReviewResponse,
  MentorSubmissionResponse,
  MentorSubmissionDetail,
  CreateSubmissionPayload,
  UpdateSubmissionPayload,
  CreateSubmissionRepositoryPayload,
  UpdateSubmissionRepositoryPayload,
  StudentPerformanceRow,
  StudentPerformanceResponse,
  SubmissionMentorQuery,
  MentorJournalQuery,
  MentorJournalResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export type SubmissionEligibility = {
  streamStatus: StreamStatus;
  enrolled: boolean;
};

export type MentorJournalDbRow = {
  studentId: number;
  studentUserId: number;
  studentFirstName: string | null;
  studentLastName: string | null;
  studentStatus: "ACTIVE" | "GRADUATED" | "EXPELLED";
  totalTasks: number;
  submittedTasks: number;
  acceptedTasks: number;
  averageScore: number | null;
  lastActivityAt: Date | null;
};

export type StudentReviewRow = {
  id: number;
  submissionId: number;
  mentorId: number;
  score: number;
  comment: string;
  reviewedAt: Date;
  mentorFirstName: string | null;
  mentorLastName: string | null;
};

export type SubmissionReviewRepositoryResponse = {
  submission: SubmissionDto | null;
  reviews: StudentReviewRow[];
};

export type MentorSubmissionRow = {
  id: number;
  taskId: number;
  studentId: number;
  streamId: number;
  repoLink: string;
  status: SubmissionStatus;
  createdAt: Date;
  studentFirstName: string | null;
  studentLastName: string | null;
  taskTitle: string;
  taskDeadline: Date;
};

export type MentorReviewRow = {
  id: number;
  submissionId: number;
  mentorId: number;
  score: number;
  comment: string;
  reviewedAt: Date;
  mentorFirstName: string | null;
  mentorLastName: string | null;
};

export type MentorSubmissionDetailRow = {
  submission: (MentorSubmissionRow & { taskDescription: string }) | null;
  reviews: MentorReviewRow[];
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
  ) => Promise<PaginationResponse<MentorSubmissionRow>>;
  findMentorSubmissionById: (
    submissionId: number,
    mentorId: number,
  ) => Promise<MentorSubmissionDetailRow>;
  findMentorJournal: (
    mentorId: number,
    streamId: number,
  ) => Promise<MentorJournalDbRow[]>;
  findById: (id: number) => Promise<SubmissionDto | null>;
  findStudentUserId: (submissionId: number) => Promise<number | null>;
  findMentorUserIdBySubmission: (
    submissionId: number,
  ) => Promise<number | null>;
  findMentorNotificationContext: (submissionId: number) => Promise<{
    mentorUserId: number;
    studentFirstName: string | null;
    studentLastName: string | null;
    taskTitle: string;
  } | null>;
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
  ) => Promise<PaginationResponse<MentorSubmissionResponse>>;
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
  ) => Promise<MentorSubmissionDetail>;
  getMentorJournal: (
    mentorId: number,
    streamId: number,
  ) => Promise<MentorJournalResponse>;
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
  getMentorJournal: (
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
