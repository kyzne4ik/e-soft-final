import type {
  ReviewDto,
  ReviewResponse,
  CreateReviewPayload,
  UpdateReviewPayload,
  CreateReviewRepositoryPayload,
  UpdateReviewRepositoryPayload,
} from "@repo/schemas";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IReviewRepository {
  findById: (id: number) => Promise<ReviewDto | null>;
  findStudentUserId: (submissionId: number) => Promise<number | null>;
  create: (data: CreateReviewRepositoryPayload) => Promise<ReviewDto>;
  update: (
    id: number,
    data: UpdateReviewRepositoryPayload,
  ) => Promise<ReviewDto | null>;
}

export interface IReviewService {
  createReview: (
    mentorId: number,
    submissionId: number,
    data: CreateReviewPayload,
  ) => Promise<ReviewResponse>;
  updateReview: (
    mentorId: number,
    reviewId: number,
    data: UpdateReviewPayload,
  ) => Promise<ReviewResponse>;
}

export interface IReviewController {
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  update: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}

export interface IReviewGuard {
  assertOwnReview: (reviewId: number, mentorId: number) => Promise<ReviewDto>;
}
