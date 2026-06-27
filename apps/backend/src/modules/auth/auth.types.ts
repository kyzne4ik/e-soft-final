import {
  ActivatePayload,
  AuthTokenResponse,
  CreateInvitePayload,
  InviteResponse,
  LoginPayload,
  RefreshTokenPayload,
  UserResponse,
  LogoutPayload,
} from "@repo/schemas";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IAuthService {
  login: (data: LoginPayload) => Promise<AuthTokenResponse>;
  logout: (data: LogoutPayload) => Promise<void>;
  refresh: (data: RefreshTokenPayload) => Promise<AuthTokenResponse>;
  activate: (data: ActivatePayload) => Promise<AuthTokenResponse>;
  invite: (data: CreateInvitePayload) => Promise<InviteResponse>;
  me: (userId: number) => Promise<UserResponse>;
}

export interface IAuthController {
  login: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  logout: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  refresh: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  activate: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  invite: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
  me: (req: FastifyRequest, rep: FastifyReply) => Promise<FastifyReply>;
}
