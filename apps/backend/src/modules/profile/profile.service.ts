import {
  UserDto,
  UserResponse,
  ChangePasswordPayload,
  UpdateProfilePayload,
  UserTelegramResponse,
  CreateUserTelegramPayload,
  GenerateLinkResponse,
} from "@repo/schemas";
import { Hash } from "@utils";
import { isPgError, PG } from "@repo/database";
import { generateLinkMap, profileMap } from "./profile.mapper";
import { IProfileService } from "./profile.types";
import { NotFoundError, BadRequestError, ConflictError } from "@error";
import { UserRepository } from "@modules/user/user.repository";
import { userMap } from "@modules/user/user.mapper";
import { UserTelegramStore } from "./user-telegram/user-telegram.store";
import { UserTelegramRepository } from "./user-telegram/user-telegram.repository";

export class ProfileService implements IProfileService {
  constructor(
    private userTelegramStore: UserTelegramStore,
    private userTelegramRepo: UserTelegramRepository,
    private userRepo: UserRepository,
  ) {}

  async changePassword(
    userId: number,
    data: ChangePasswordPayload,
  ): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) throw new NotFoundError("Пользователь не найден");

    const isValid = await Hash.compareHash(data.oldPassword, user.passwordHash);
    if (!isValid) throw new BadRequestError("Текущий пароль неверен");

    if (data.newPassword.length < 8)
      throw new BadRequestError("Пароль должен быть не короче 8 символов");

    const passwordHash = await Hash.generateHash(data.newPassword);
    await this.userRepo.update(userId, { passwordHash });
  }

  async updateProfile(
    userId: number,
    data: UpdateProfilePayload,
  ): Promise<UserResponse> {
    let updated: UserDto | null;
    try {
      updated = await this.userRepo.update(userId, data);
    } catch (e) {
      if (isPgError(e, PG.UNIQUE))
        throw new ConflictError("Этот email уже используется");
      throw e;
    }

    if (!updated) throw new NotFoundError("Пользователь не найден");

    return userMap(updated);
  }

  async getTelegram(userId: number): Promise<UserTelegramResponse> {
    const row = await this.userTelegramRepo.findByUserId(userId);

    return profileMap(row);
  }

  async bindTelegram(
    userId: number,
    data: CreateUserTelegramPayload,
  ): Promise<UserTelegramResponse | null> {
    try {
      const row = await this.userTelegramRepo.createByUserId(userId, data);
      if (!row) return null;

      return profileMap(row);
    } catch (e) {
      if (isPgError(e, PG.UNIQUE))
        throw new ConflictError(
          "Этот Telegram уже привязан к другому аккаунту",
        );
      throw e;
    }
  }

  async unbindTelegram(userId: number): Promise<boolean> {
    return await this.userTelegramRepo.deleteByUserId(userId);
  }

  async generateLinkToken(userId: number): Promise<GenerateLinkResponse> {
    const token = await this.userTelegramStore.generateLinkToken(userId);
    return generateLinkMap(token);
  }

  async resolveLinkToken(token: string): Promise<string | null> {
    return await this.userTelegramStore.resolveToken(token);
  }

  async getUserByTgId(tgId: string): Promise<UserDto | null> {
    return await this.userRepo.findByTgId(tgId);
  }
}
