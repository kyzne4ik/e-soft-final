import {
  LoginPayload,
  AuthTokenResponse,
  CreateInvitePayload,
  InviteResponse,
  ActivatePayload,
  UserResponse,
  RefreshTokenPayload,
} from "@repo/schemas";
import { Hash, logger } from "@utils";
import { enqueueEmail } from "@bull";
import { IAuthService } from "./auth.types";
import { userMap } from "@modules/user/user.mapper";
import { ConflictError } from "@error/conflict.error";
import { NotFoundError } from "@error/not-found.error";
import { InviteService } from "./invite/invite.service";
import { cancelLeadIgnore } from "@bull/queues/lead.queue";
import { BadRequestError } from "@error/bad-request.error";
import { LeadRepository } from "@modules/crm/lead.repository";
import { UnauthorizedError } from "@error/unauthorized.error";
import { UserRepository } from "@modules/user/user.repository";
import { AuthTokenService } from "./auth-token/auth-token.service";
import { StreamService } from "@modules/lms/stream/stream.service";
import { activateOptions } from "@mail/templates/auth/acitvate/activate-options";
import { StreamStudentService } from "@modules/lms/stream/stream-student/stream-student.service";

export class AuthService implements IAuthService {
  constructor(
    private userRepo: UserRepository,
    private authToken: AuthTokenService,
    private inviteService: InviteService,
    private streamStudentService: StreamStudentService,
    private streamService: StreamService,
    private leadRepo: LeadRepository,
  ) {}

  async login(data: LoginPayload): Promise<AuthTokenResponse> {
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) throw new UnauthorizedError("Неверный email или пароль");

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

  async confirmEnrollment(token: string): Promise<AuthTokenResponse> {
    const payload = await this.inviteService.destroy(token);
    if (!payload)
      throw new BadRequestError("Ссылка недействительна или истекла");

    const user = await this.userRepo.findByEmail(payload.email);
    if (!user) throw new NotFoundError("Пользователь не найден");

    if (payload.targetStreamId != null && user.profileId != null) {
      await this.streamStudentService.addStudent(
        payload.targetStreamId,
        user.profileId,
      );
    }

    const lead = await this.leadRepo.findAcceptedByEmail(payload.email);
    if (lead) {
      await this.leadRepo.linkConvertedUser(payload.email, user.id);
      await cancelLeadIgnore(lead.id);
    }

    return this.authToken.issue({
      id: user.id,
      role: user.role,
      profileId: user.profileId,
    });
  }

  async invite(data: CreateInvitePayload): Promise<InviteResponse> {
    const user = await this.userRepo.findByEmail(data.email);
    if (user) throw new ConflictError("Email уже занят");

    if (!data?.targetStreamId)
      throw new NotFoundError("Целевой поток заявки не найден");

    const stream = await this.streamService.getStream(data?.targetStreamId);

    if (!stream) throw new NotFoundError("Целевой поток заявки не найден");

    const tokens = await this.inviteService.create(data);

    await enqueueEmail(
      activateOptions(data.email, tokens.inviteLink, stream.name),
    );

    return tokens;
  }

  async activate(data: ActivatePayload): Promise<AuthTokenResponse> {
    const payload = await this.inviteService.destroy(data.token);
    if (!payload) throw new BadRequestError("Инвайт недействителен или истёк");

    const passwordHash = await Hash.generateHash(data.password);

    const existing = await this.userRepo.findByEmail(payload.email);
    if (existing) throw new ConflictError("Email уже занят");

    const user = await this.userRepo.createWithProfile({
      ...payload,
      ...data,
      patronymic: payload.patronymic ?? data.patronymic ?? null,
      passwordHash,
    });

    if (payload.targetStreamId != null && user.profileId != null) {
      try {
        await this.streamStudentService.addStudent(
          payload.targetStreamId,
          user.profileId,
        );
      } catch (err) {
        logger.error(
          { err, userId: user.id, streamId: payload.targetStreamId },
          "Не удалось автоматически зачислить студента в поток при активации",
        );
      }
    }

    const tokens = await this.authToken.issue({
      id: user.id,
      profileId: user.profileId,
      role: user.role,
    });

    await this.leadRepo.linkConvertedUser(payload.email, user.id);
    const lead = await this.leadRepo.findAcceptedByEmail(payload.email);
    if (lead) await cancelLeadIgnore(lead.id);

    return tokens;
  }

  async refresh(data: RefreshTokenPayload): Promise<AuthTokenResponse> {
    const payload = await this.authToken.verifyRefresh(data.refreshToken);
    if (!payload)
      throw new UnauthorizedError("Refresh-токен недействителен или истёк");

    const user = await this.userRepo.findById(payload.id);
    if (!user) {
      throw new UnauthorizedError("Пользователь не найден");
    }

    return this.authToken.issue(payload);
  }

  async me(userId: number): Promise<UserResponse> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundError("Пользователь не найдён");

    return userMap(user);
  }
}
