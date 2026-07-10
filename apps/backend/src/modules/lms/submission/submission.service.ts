import {
  SubmissionStatus,
  SubmissionResponse,
  SubmissionMentorQuery,
  CreateSubmissionPayload,
  UpdateSubmissionPayload,
  StudentPerformanceResponse,
  SubmissionReviewResponse,
  MentorSubmissionResponse,
  MentorSubmissionDetail,
  MentorJournalResponse,
} from "@repo/schemas";
import { ISubmissionService } from "./submission.types";
import { NotFoundError } from "@error";
import { ConflictError } from "@error/conflict.error";
import { PaginationResponse } from "@types";
import { isPgError, PG } from "@repo/database";
import { StreamGuard } from "../stream/stream.guard";
import { SubmissionGuard } from "./submission.guard";
import { SubmissionRepository } from "./submission.repository";
import {
  submissionMap,
  mentorSubmissionsMap,
  mentorSubmissionDetailMap,
  submissionReviewMap,
} from "./submission.mapper";
import { NotificationService } from "@modules/notification/notification.service";
import { buildMentorSubmissionLink } from "@utils/build-links";
import { SubmissionTemplate } from "@telegram/templates";

export class SubmissionService implements ISubmissionService {
  constructor(
    private submissionRepo: SubmissionRepository,
    private submissionGuard: SubmissionGuard,
    private streamGuard: StreamGuard,
    private notificationService: NotificationService,
  ) {}

  async getMentorSubmissions(
    mentorId: number,
    filters?: SubmissionMentorQuery,
  ): Promise<PaginationResponse<MentorSubmissionResponse>> {
    const submissions = await this.submissionRepo.findMentorSubmissions(
      mentorId,
      filters,
    );

    return {
      ...submissions,
      data: mentorSubmissionsMap(submissions.data),
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

    return submissionReviewMap(result);
  }

  async getMentorSubmissionById(
    submissionId: number,
    mentorId: number,
  ): Promise<MentorSubmissionDetail> {
    const result = await this.submissionRepo.findMentorSubmissionById(
      submissionId,
      mentorId,
    );

    return mentorSubmissionDetailMap(result);
  }

  async getMentorJournal(
    mentorId: number,
    streamId: number,
  ): Promise<MentorJournalResponse> {
    return this.submissionRepo.findMentorJournal(mentorId, streamId);
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

    const existing = await this.submissionRepo.findStudentSubmissionByTask(
      data.taskId,
      studentId,
    );
    if (existing.submission) {
      throw new ConflictError(
        "Вы уже сдавали это задание. Для пересдачи отредактируйте существующую сдачу.",
      );
    }

    try {
      const submission = await this.submissionRepo.create({
        ...data,
        studentId,
      });

      const ctx = await this.submissionRepo.findMentorNotificationContext(
        submission.id,
      );
      if (ctx) {
        await this.notificationService.create({
          userId: ctx.mentorUserId,
          message: SubmissionTemplate.submitted({
            studentFirstName: ctx.studentFirstName,
            studentLastName: ctx.studentLastName,
            taskTitle: ctx.taskTitle,
            link: buildMentorSubmissionLink(submission.id),
          }),
          isSilent: false,
        });
      }

      return submissionMap(submission);
    } catch (e) {
      if (isPgError(e, PG.FK))
        throw new NotFoundError("Задача или студент не найдены");
      if (isPgError(e, PG.UNIQUE))
        throw new ConflictError(
          "Вы уже сдавали это задание. Для пересдачи отредактируйте существующую сдачу.",
        );
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

    const ctx =
      await this.submissionRepo.findMentorNotificationContext(submissionId);
    if (ctx) {
      await this.notificationService.create({
        userId: ctx.mentorUserId,
        message: SubmissionTemplate.resubmitted({
          studentFirstName: ctx.studentFirstName,
          studentLastName: ctx.studentLastName,
          taskTitle: ctx.taskTitle,
          link: buildMentorSubmissionLink(submissionId),
        }),
        isSilent: false,
      });
    }

    return submissionMap(submission);
  }
}
