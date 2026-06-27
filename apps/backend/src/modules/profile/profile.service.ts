import {
  BindTelegramPayload,
  ChangePasswordPayload,
  UserTelegramResponse,
} from "@repo/schemas";
import { Hash } from "@utils/hash";
import { profileMap } from "./profile.mapper";
import { IProfileService } from "./profile.types";
import { NotFoundError } from "@error/not-found.error";
import { BadRequestError } from "@error/bad-request.error";
import { UserRepository } from "@modules/user/user.repository";
import { UserTelegramRepository } from "./user-telegram/user-telegram.repository";

export class ProfileService implements IProfileService {
  constructor(
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

  async getTelegram(userId: number): Promise<UserTelegramResponse> {
    const row = await this.userTelegramRepo.findByUserId(userId);

    return profileMap(row);
  }

  async bindTelegram(
    userId: number,
    data: BindTelegramPayload,
  ): Promise<UserTelegramResponse | null> {
    const row = await this.userTelegramRepo.createByUserId(userId, data);
    if (!row) return null;

    return profileMap(row);
  }

  async unbindTelegram(userId: number): Promise<boolean> {
    return await this.userTelegramRepo.deleteByUserId(userId);
  }
}
