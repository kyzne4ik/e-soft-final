import type { PaginationResponse } from "@types";
import type {
  Role,
  UserDto,
  CreateUserPayload,
  UpdateUserPayload,
  UserResponse,
} from "@repo/schemas";
import { FastifyReply, FastifyRequest } from "fastify";

export type UserRepositoryPayload = Omit<
  UserDto,
  "id" | "isActivated" | "createdAt" | "updatedAt"
>;

export type UpdateUserRepositoryPayload = {
  [K in keyof UserRepositoryPayload]?: UserRepositoryPayload[K] | undefined;
};

export type UserFilters = {
  role?: Role | undefined;
  isActivated?: boolean | undefined;
  page?: number | undefined;
  limit?: number | undefined;
};

export interface IUsersRepository {
  findAll: (filters?: UserFilters) => Promise<PaginationResponse<UserDto>>;
  findById: (id: number) => Promise<UserDto | null>;
  update: (
    id: number,
    data: UpdateUserRepositoryPayload,
  ) => Promise<UserDto | null>;
  create: (data: UserRepositoryPayload) => Promise<UserDto>;
  delete: (id: number) => Promise<boolean>;
}

export interface IUsersService {
  getUsers: (
    filters?: UserFilters,
  ) => Promise<PaginationResponse<UserResponse>>;
  getUser: (id: number) => Promise<UserResponse | null>;
  createUser: (data: CreateUserPayload) => Promise<UserResponse>;
  updateUser: (
    id: number,
    data: UpdateUserPayload,
  ) => Promise<UserResponse | null>;
  deleteUser: (id: number) => Promise<boolean>;
}

export interface IUsersController {
  create: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  update: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  delete: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getById: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  getAll: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}
