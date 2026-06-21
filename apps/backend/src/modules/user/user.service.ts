import {
  CreateUserPayload,
  UpdateUserPayload,
  UserResponse,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { UserRepository } from "./user.repository";
import { IUsersService, UserFilters } from "./user.types";
import { userMap, usersMap } from "./user.mapper";
import { isPgError, PG } from "@repo/database";
import { ConflictError } from "@error/conflict.error";
import bcrypt from "bcrypt";

export class UserService implements IUsersService {
  constructor(public userRepository: UserRepository) {}
  async getUsers(
    filters?: UserFilters,
  ): Promise<PaginationResponse<UserResponse>> {
    const users = await this.userRepository.findAll(filters);

    return {
      ...users,
      data: usersMap(users.data),
    };
  }
  async getUser(id: number): Promise<UserResponse | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;

    return userMap(user);
  }
  async createUser(data: CreateUserPayload): Promise<UserResponse> {
    try {
      const { password, ...rest } = data;
      const passwordHash = await bcrypt.hash(password, 10);

      const user = await this.userRepository.create({ ...rest, passwordHash });
      return userMap(user);
    } catch (e) {
      if (isPgError(e, PG.UNIQUE)) throw new ConflictError("Email уже занят");
      if (isPgError(e, PG.FK))
        throw new ConflictError("Есть связанные таблицы");
      throw e;
    }
  }
  async updateUser(
    id: number,
    data: UpdateUserPayload,
  ): Promise<UserResponse | null> {
    const user = await this.userRepository.update(id, data);

    if (!user) return null;

    return userMap(user);
  }
  async deleteUser(id: number): Promise<boolean> {
    return await this.userRepository.delete(id);
  }
}
