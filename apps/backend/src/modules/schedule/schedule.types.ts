import {
  LessonsResponse,
  CreateLessonPayload,
  UpdateLessonPayload,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export type ScheduleFilters = {
  streamId?: number | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

export interface IScheduleService {
  getSchedule: (
    filters?: ScheduleFilters,
  ) => Promise<PaginationResponse<LessonsResponse>>;
  getLesson: (id: number) => Promise<LessonsResponse>;
  createLesson: (data: CreateLessonPayload) => Promise<LessonsResponse>;
  updateLesson: (
    id: number,
    data: UpdateLessonPayload,
  ) => Promise<LessonsResponse | null>;
  deleteLesson: (id: number) => Promise<boolean>;
}

export interface IScheduleController {
  getAll: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getById: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  update: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  delete: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}
