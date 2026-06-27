import {
  UserTelegramDto,
  CreateUserTelegramPayload,
  UpdateUserTelegramPayload,
} from "@repo/schemas";

export interface IUserTelegramRepository {
  findByUserId: (userId: number) => Promise<UserTelegramDto | null>;
  createByUserId: (
    userId: number,
    data: CreateUserTelegramPayload,
  ) => Promise<UserTelegramDto>;
  updateByUserId: (
    userId: number,
    data: UpdateUserTelegramPayload,
  ) => Promise<UserTelegramDto | null>;
  deleteByUserId: (userId: number) => Promise<boolean>;
}
