import {
  SubmissionStatus,
  SubmissionResponse,
  SubmissionMentorQuery,
  CreateSubmissionPayload,
  UpdateSubmissionPayload,
  StudentPerformanceResponse,
} from "@repo/schemas";
import {
  ISubmissionService,
  SubmissionReviewResponse,
  SubmissionReviewRepositoryResponse,
} from "./submission.types";
import { NotFoundError } from "@error";
import { PaginationResponse } from "@types";
import { isPgError, PG } from "@repo/database";
import { reviewsMap } from "./review/review.mapper";
import { StreamGuard } from "../stream/stream.guard";
import { SubmissionGuard } from "./submission.guard";
import { SubmissionRepository } from "./submission.repository";
import { submissionMap, submissionsMap } from "./submission.mapper";

export class SubmissionService implements ISubmissionService {
  constructor(
    private submissionRepo: SubmissionRepository,
    private submissionGuard: SubmissionGuard,
    private streamGuard: StreamGuard,
  ) {}

  async getMentorSubmissions(
    mentorId: number,
    filters?: SubmissionMentorQuery,
  ): Promise<PaginationResponse<SubmissionResponse>> {
    const submissions = await this.submissionRepo.findMentorSubmissions(
      mentorId,
      filters,
    );

    return {
      ...submissions,
      data: submissionsMap(submissions.data),
    };
  }

  async getStudentPerformance(
    streamId: number,
    studentId: number,
  ): Promise<StudentPerformanceResponse> {
    const rows = await this.submissionRepo.findStudentPerformance(
      streamId,
      studentId,
    );

    const scored = rows.filter((r) => r.score !== null);
    const averageScore = scored.length
      ? Math.round(
          (scored.reduce((sum, r) => sum + (r.score ?? 0), 0) / scored.length) *
            100,
        ) / 100
      : null;

    return { averageScore, rows };
  }

  async getStudentSubmissionByTask(
    taskId: number,
    studentId: number,
  ): Promise<SubmissionReviewResponse> {
    const result = await this.submissionRepo.findStudentSubmissionByTask(
      taskId,
      studentId,
    );

    return this.mapSubmissionReview(result);
  }

  async getMentorSubmissionById(
    submissionId: number,
    mentorId: number,
  ): Promise<SubmissionReviewResponse> {
    const result = await this.submissionRepo.findMentorSubmissionById(
      submissionId,
      mentorId,
    );

    return this.mapSubmissionReview(result);
  }

  async getSubmission(id: number): Promise<SubmissionResponse> {
    const submission = await this.submissionRepo.findById(id);

    if (!submission) throw new NotFoundError("Решение не найдено");

    return submissionMap(submission);
  }

  async switchStatusSubmission(
    mentorId: number,
    submissionId: number,
    status: SubmissionStatus,
  ): Promise<SubmissionResponse> {
    const { streamId } = await this.submissionGuard.assertMentorOfSubmission(
      mentorId,
      submissionId,
    );
    await this.streamGuard.assertActive(streamId);

    const submission = await this.submissionRepo.switchStatus(
      submissionId,
      status,
    );

    if (!submission) throw new NotFoundError("Решение не найдено");

    return submissionMap(submission);
  }

  async createSubmission(
    studentId: number,
    data: CreateSubmissionPayload,
  ): Promise<SubmissionResponse> {
    const { streamId } = await this.submissionGuard.assertStudentEnrolled(
      data.taskId,
      studentId,
    );
    await this.streamGuard.assertActive(streamId);

    try {
      const submission = await this.submissionRepo.create({
        ...data,
        studentId,
      });

      return submissionMap(submission);
    } catch (e) {
      if (isPgError(e, PG.FK))
        throw new NotFoundError("Задача или студент не найдены");
      throw e;
    }
  }

  async updateSubmission(
    studentId: number,
    submissionId: number,
    data: UpdateSubmissionPayload,
  ): Promise<SubmissionResponse> {
    const { streamId } = await this.submissionGuard.assertOwnSubmission(
      studentId,
      submissionId,
    );
    await this.streamGuard.assertActive(streamId);

    const submission = await this.submissionRepo.update(submissionId, data);

    if (!submission) throw new NotFoundError("Решение не найдено");

    return submissionMap(submission);
  }

  private mapSubmissionReview(
    r: SubmissionReviewRepositoryResponse,
  ): SubmissionReviewResponse {
    return {
      submission: r.submission ? submissionMap(r.submission) : null,
      reviews: reviewsMap(r.reviews),
    };
  }
}
