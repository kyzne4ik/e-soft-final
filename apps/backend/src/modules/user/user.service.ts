import {
  CreateUserPayload,
  UpdateUserPayload,
  UserResponse,
} from "@repo/schemas";
import { Hash } from "@utils";
import { PaginationResponse } from "@types";
import { isPgError, PG } from "@repo/database";
import { userMap, usersMap } from "./user.mapper";
import { UserRepository } from "./user.repository";
import { ConflictError } from "@error/conflict.error";
import { NotFoundError } from "@error/not-found.error";
import { IUsersService, UserFilters } from "./user.types";

export class UserService implements IUsersService {
  constructor(private userRepository: UserRepository) {}

  async getUsers(
    filters?: UserFilters,
  ): Promise<PaginationResponse<UserResponse>> {
    const users = await this.userRepository.findAll(filters);

    return {
      ...users,
      data: usersMap(users.data),
    };
  }

  async getUser(id: number): Promise<UserResponse> {
    const user = await this.userRepository.findById(id);
    if (!user) throw new NotFoundError("Пользователь не найден");

    return userMap(user);
  }

  async getUserByEmail(email: string): Promise<UserResponse | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;

    return userMap(user);
  }

  async createUserWithProfile(data: CreateUserPayload): Promise<UserResponse> {
    try {
      const { password, ...rest } = data;
      const passwordHash = await Hash.generateHash(password);

      const user = await this.userRepository.createWithProfile({
        ...rest,
        passwordHash,
      });
      return userMap(user);
    } catch (e) {
      if (isPgError(e, PG.UNIQUE)) throw new ConflictError("Email уже занят");
      if (isPgError(e, PG.FK))
        throw new ConflictError("Есть связанные таблицы");
      throw e;
    }
  }

  async updateUser(id: number, data: UpdateUserPayload): Promise<UserResponse> {
    const user = await this.userRepository.update(id, data);

    if (!user) throw new NotFoundError("Не удалось найти пользователя");

    return userMap(user);
  }

  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
