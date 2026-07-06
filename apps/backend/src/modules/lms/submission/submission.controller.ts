import {
  idParamSchema,
  submissionMentorQuerySchema,
  createSubmissionPayloadSchema,
  updateSubmissionPayloadSchema,
  switchSubmissionStatusPayloadSchema,
} from "@repo/schemas";
import { ForbiddenError } from "@error";
import { FastifyRequest, FastifyReply } from "fastify";
import { ResponseToolKit, getCurrentUser } from "@utils";
import { SubmissionService } from "./submission.service";
import { ISubmissionController } from "./submission.types";

export class SubmissionController implements ISubmissionController {
  constructor(private submissionService: SubmissionService) {}

  getMentorSubmissions = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const mentorId = this.requireProfileId(req, "Профиль ментора не найден");
    const query = submissionMentorQuerySchema.parse(req.query);
    const result = await this.submissionService.getMentorSubmissions(
      mentorId,
      query,
    );

    return rep.send(ResponseToolKit.paginated(result));
  };

  getStudentPerformance = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const studentId = this.requireProfileId(req, "Профиль студента не найден");
    const { id } = idParamSchema.parse(req.params);
    const result = await this.submissionService.getStudentPerformance(
      id,
      studentId,
    );

    return rep.send(ResponseToolKit.success(result));
  };

  getStudentSubmissionByTask = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const studentId = this.requireProfileId(req, "Профиль студента не найден");
    const { id } = idParamSchema.parse(req.params);
    const result = await this.submissionService.getStudentSubmissionByTask(
      id,
      studentId,
    );

    return rep.send(ResponseToolKit.success(result));
  };

  getMentorSubmissionById = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const mentorId = this.requireProfileId(req, "Профиль ментора не найден");
    const { id } = idParamSchema.parse(req.params);
    const result = await this.submissionService.getMentorSubmissionById(
      id,
      mentorId,
    );

    return rep.send(ResponseToolKit.success(result));
  };

  getById = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { id } = idParamSchema.parse(req.params);
    const result = await this.submissionService.getSubmission(id);

    return rep.send(ResponseToolKit.success(result));
  };

  switchStatus = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const mentorId = this.requireProfileId(req, "Профиль ментора не найден");
    const { id } = idParamSchema.parse(req.params);
    const { status } = switchSubmissionStatusPayloadSchema.parse(req.body);

    const { submission } = await this.submissionService.getMentorSubmissionById(
      id,
      mentorId,
    );
    if (!submission)
      throw new ForbiddenError("Нельзя менять статус чужой сдачи");

    const result = await this.submissionService.switchStatusSubmission(
      mentorId,
      id,
      status,
    );

    return rep.send(ResponseToolKit.success(result, "Статус обновлён"));
  };

  create = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const studentId = this.requireProfileId(req, "Профиль студента не найден");
    const body = createSubmissionPayloadSchema.parse(req.body);
    const result = await this.submissionService.createSubmission(
      studentId,
      body,
    );

    return rep
      .status(201)
      .send(ResponseToolKit.success(result, "Решение отправлено", 201));
  };

  update = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const studentId = this.requireProfileId(req, "Профиль студента не найден");
    const { id } = idParamSchema.parse(req.params);

    const existing = await this.submissionService.getSubmission(id);
    if (existing.studentId !== studentId)
      throw new ForbiddenError("Нельзя редактировать чужое решение");

    const body = updateSubmissionPayloadSchema.parse(req.body);
    const result = await this.submissionService.updateSubmission(
      studentId,
      id,
      body,
    );

    return rep.send(ResponseToolKit.success(result, "Решение обновлено"));
  };

  private requireProfileId(req: FastifyRequest, message: string): number {
    const { user } = getCurrentUser(req);
    if (user.profileId == null) throw new ForbiddenError(message);

    return user.profileId;
  }
}
