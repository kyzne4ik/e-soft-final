import type {
  CourseDto,
  CourseResponse,
  CreateCoursePayload,
  UpdateCoursePayload,
  CreateCourseRepositoryPayload,
  UpdateCourseRepositoryPayload,
} from "@repo/schemas";
import type { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export type CourseFilters = {
  page?: number | undefined;
  limit?: number | undefined;
};

export interface ICourseRepository {
  findAll: (filters?: CourseFilters) => Promise<PaginationResponse<CourseDto>>;
  findById: (id: number) => Promise<CourseDto | null>;
  create: (data: CreateCourseRepositoryPayload) => Promise<CourseDto>;
  update: (
    id: number,
    data: UpdateCourseRepositoryPayload,
  ) => Promise<CourseDto | null>;
  delete: (id: number) => Promise<boolean>;
}

export interface ICourseService {
  getCourses: (
    filters?: CourseFilters,
  ) => Promise<PaginationResponse<CourseResponse>>;
  getCourse: (id: number) => Promise<CourseResponse>;
  createCourse: (data: CreateCoursePayload) => Promise<CourseResponse>;
  updateCourse: (
    id: number,
    data: UpdateCoursePayload,
  ) => Promise<CourseResponse>;
  deleteCourse: (id: number) => Promise<boolean>;
}

export interface ICourseController {
  getAll: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getById: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  update: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  delete: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}
