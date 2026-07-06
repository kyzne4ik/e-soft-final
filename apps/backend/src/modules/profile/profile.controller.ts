import {
  bindTelegramPayloadSchema,
  changePasswordPayloadSchema,
} from "@repo/schemas";
import { getCurrentUser } from "@utils";
import { ResponseToolKit } from "@utils/response";
import { ProfileService } from "./profile.service";
import { IProfileController } from "./profile.types";
import { FastifyRequest, FastifyReply } from "fastify";

export class ProfileController implements IProfileController {
  constructor(private profileService: ProfileService) {}

  changePassword = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);
    const body = changePasswordPayloadSchema.parse(req.body);
    await this.profileService.changePassword(user.id, body);

    return rep.send(ResponseToolKit.success(null, "Пароль изменён"));
  };

  getTelegram = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);
    const data = await this.profileService.getTelegram(user.id);

    return rep.send(ResponseToolKit.success(data));
  };

  bindTelegram = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);
    const body = bindTelegramPayloadSchema.parse(req.body);

    const data = await this.profileService.bindTelegram(user.id, body);
    return rep.send(ResponseToolKit.success(data, "Telegram привязан"));
  };

  unbindTelegram = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);

    await this.profileService.unbindTelegram(user.id);
    return rep.send(ResponseToolKit.success(null, "Telegram отвязан"));
  };

  generateLink = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const { user } = getCurrentUser(req);

    const token = await this.profileService.generateLinkToken(user.id);
    return rep.send(ResponseToolKit.success(token));
  };
}
