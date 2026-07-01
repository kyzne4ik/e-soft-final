import {
  UserDto,
  UserTelegramResponse,
  ChangePasswordPayload,
  CreateUserTelegramPayload,
  GenerateLinkResponse,
} from "@repo/schemas";
import { FastifyReply, FastifyRequest } from "fastify";

export interface IProfileService {
  changePassword: (
    userId: number,
    data: ChangePasswordPayload,
  ) => Promise<void>;
  getTelegram: (userId: number) => Promise<UserTelegramResponse | null>;
  bindTelegram: (
    userId: number,
    data: CreateUserTelegramPayload,
  ) => Promise<UserTelegramResponse | null>;
  unbindTelegram: (userId: number) => Promise<boolean>;
  generateLinkToken: (userId: number) => Promise<GenerateLinkResponse>;
  resolveLinkToken: (token: string) => Promise<string | null>;
  getUserByTgId: (tgId: string) => Promise<UserDto | null>;
}

export interface IProfileController {
  changePassword: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  getTelegram: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  bindTelegram: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  unbindTelegram: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
  generateLink: (
    req: FastifyRequest,
    rep: FastifyReply,
  ) => Promise<FastifyReply>;
}
