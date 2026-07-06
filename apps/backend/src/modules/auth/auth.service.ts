import { Hash } from "@utils";
import { IAuthService } from "./auth.types";
import { InviteService } from "./invite/invite.service";
import {
  LoginPayload,
  AuthTokenResponse,
  CreateInvitePayload,
  InviteResponse,
  ActivatePayload,
  UserResponse,
  RefreshTokenPayload,
  LogoutPayload,
} from "@repo/schemas";
import { AuthTokenService } from "./auth-token/auth-token.service";
import { UnauthorizedError } from "@error/unauthorized.error";
import { ForbiddenError } from "@error/forbidden.error";
import { ConflictError } from "@error/conflict.error";
import { enqueueEmail } from "@bull";
import { activateOptions } from "@mail/templates/auth/acitvate/activate-options";
import { BadRequestError } from "@error/bad-request.error";
import { NotFoundError } from "@error/not-found.error";
import { userMap } from "@modules/user/user.mapper";
import { UserRepository } from "@modules/user/user.repository";

export class AuthService implements IAuthService {
  constructor(
    private userRepo: UserRepository,
    private authToken: AuthTokenService,
    private inviteService: InviteService,
  ) {}

  async login(data: LoginPayload): Promise<AuthTokenResponse> {
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) throw new UnauthorizedError("Неверный email или пароль");

    if (!user.isActivated) throw new ForbiddenError("Аккаунт не активирован");

    const passwordValid = await Hash.compareHash(
      data.password,
      user.passwordHash,
    );
    if (!passwordValid)
      throw new UnauthorizedError("Неверный email или пароль");

    const tokens = await this.authToken.issue({
      id: user.id,
      role: user.role,
      profileId: user.profileId,
    });

    return tokens;
  }

  async logout(data: LogoutPayload): Promise<void> {
    await this.authToken.revoke(data.refreshToken);
  }

  async invite(data: CreateInvitePayload): Promise<InviteResponse> {
    const user = await this.userRepo.findByEmail(data.email);
    if (user?.isActivated) throw new ConflictError("Email уже занят");

    const tokens = await this.inviteService.create(data);
    await enqueueEmail(activateOptions(data.email, tokens.inviteLink));

    return tokens;
  }

  async activate(data: ActivatePayload): Promise<AuthTokenResponse> {
    const payload = await this.inviteService.destroy(data.token);
    if (!payload) throw new BadRequestError("Инвайт недействителен или истёк");

    const passwordHash = await Hash.generateHash(data.password);

    const existing = await this.userRepo.findByEmail(payload.email);
    if (existing?.isActivated)
      throw new ConflictError("Аккаунт уже активирован");

    const user = await this.userRepo.createWithProfile({
      ...payload,
      patronymic: payload.patronymic ?? null,
      passwordHash,
      isActivated: true,
    });

    const tokens = await this.authToken.issue({
      id: user.id,
      profileId: user.profileId,
      role: user.role,
    });

    return tokens;
  }

  async refresh(data: RefreshTokenPayload): Promise<AuthTokenResponse> {
    const payload = await this.authToken.verifyRefresh(data.refreshToken);
    if (!payload)
      throw new UnauthorizedError("Refresh-токен недействителен или истёк");

    const user = await this.userRepo.findById(payload.id);
    if (!user || !user.isActivated) {
      await this.authToken.revoke(data.refreshToken);
      throw new UnauthorizedError("Refresh-токен недействителен или истёк");
    }

    await this.authToken.revoke(data.refreshToken);
    return this.authToken.issue(payload);
  }

  async me(userId: number): Promise<UserResponse> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundError("Пользователь не найдён");

    return userMap(user);
  }
}
