import {
  UserTelegramDto,
  CreateUserTelegramPayload,
  UpdateUserTelegramPayload,
} from "@repo/schemas";

export interface IUserTelegramStore {
  generateLinkToken(userId: number): Promise<string>;
  resolveToken(token: string): Promise<string | null>;
}

export interface IUserTelegramRepository {
  findByUserId: (userId: number) => Promise<UserTelegramDto | null>;
  findByTgId: (tgId: string) => Promise<UserTelegramDto | null>;
  createByUserId: (
    userId: number,
    data: CreateUserTelegramPayload,
  ) => Promise<UserTelegramDto | null>;
  updateByUserId: (
    userId: number,
    data: UpdateUserTelegramPayload,
  ) => Promise<UserTelegramDto | null>;
  deleteByUserId: (userId: number) => Promise<boolean>;
}
