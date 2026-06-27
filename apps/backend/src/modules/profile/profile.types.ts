import {
  BindTelegramPayload,
  ChangePasswordPayload,
  UserTelegramResponse,
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
    data: BindTelegramPayload,
  ) => Promise<UserTelegramResponse | null>;
  unbindTelegram: (userId: number) => Promise<boolean>;
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
}
