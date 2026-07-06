import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "./auth.service";
import { IAuthController } from "./auth.types";
import {
  activatePayloadSchema,
  inviteStorePayloadSchema,
  loginPayloadSchema,
  logoutPayloadSchema,
} from "@repo/schemas";
import { ResponseToolKit } from "@utils/response";
import { UnauthorizedError } from "@error/unauthorized.error";

export class AuthController implements IAuthController {
  constructor(private authService: AuthService) {}

  login = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = loginPayloadSchema.parse(req.body);
    const result = await this.authService.login(body);

    return rep.send(ResponseToolKit.success(result, "Вход выполнен успешно"));
  };

  logout = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = logoutPayloadSchema.parse(req.body);
    await this.authService.logout(body);

    return rep.send(ResponseToolKit.success(null, "Выход выполнен"));
  };

  refresh = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = logoutPayloadSchema.parse(req.body);
    await this.authService.refresh(body);

    return rep.send(ResponseToolKit.success(null, "Токен обновлён"));
  };

  activate = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = activatePayloadSchema.parse(req.body);
    const res = await this.authService.activate(body);

    return rep.send(ResponseToolKit.success(res, "Аккаунт активирован"));
  };

  invite = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const body = inviteStorePayloadSchema.parse(req.body);
    const res = await this.authService.invite(body);

    return rep.send(ResponseToolKit.success(res, "Приглашение отправлено"));
  };

  me = async (
    req: FastifyRequest,
    rep: FastifyReply,
  ): Promise<FastifyReply> => {
    const userId = req.currentUser?.id;
    if (!userId) throw new UnauthorizedError("Требуется авторизация");

    const res = await this.authService.me(userId);

    return rep.send(ResponseToolKit.success(res));
  };
}
