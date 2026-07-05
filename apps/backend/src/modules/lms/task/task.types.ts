import type {
  TaskDto,
  TaskQuery,
  TaskResponse,
  CreateTaskPayload,
  UpdateTaskPayload,
  CreateTaskRepositoryPayload,
  UpdateTaskRepositoryPayload,
} from "@repo/schemas";
import type { PaginationResponse } from "@types";
import { FastifyReply, FastifyRequest } from "fastify";

export interface ITaskRepository {
  findAll: (filters?: TaskQuery) => Promise<PaginationResponse<TaskDto>>;
  findById: (id: number) => Promise<TaskDto | null>;
  create: (data: CreateTaskRepositoryPayload) => Promise<TaskDto>;
  update: (
    id: number,
    data: UpdateTaskRepositoryPayload,
  ) => Promise<TaskDto | null>;
  delete: (id: number) => Promise<boolean>;
}

export interface ITaskService {
  getTasks: (filters?: TaskQuery) => Promise<PaginationResponse<TaskResponse>>;
  getTask: (id: number) => Promise<TaskResponse>;
  createTask: (data: CreateTaskPayload) => Promise<TaskResponse>;
  updateTask: (id: number, data: UpdateTaskPayload) => Promise<TaskResponse>;
  deleteTask: (id: number) => Promise<boolean>;
}

export interface ITaskController {
  getAll: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getById: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  update: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  delete: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}
