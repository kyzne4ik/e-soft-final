import { DatabaseType, users } from "@repo/database";
import type { PaginationResponse } from "@types";
import type { UserDto } from "@repo/schemas";
import {
  IUsersRepository,
  UserFilters,
  UserRepositoryPayload,
  UpdateUserRepositoryPayload,
} from "./user.types";
import { count, desc, eq, and } from "drizzle-orm";

export class UserRepository implements IUsersRepository {
  constructor(public db: DatabaseType) {}

  async findAll(
    filters: UserFilters = {},
  ): Promise<PaginationResponse<UserDto>> {
    const { role, isActivated, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (role) conditions.push(eq(users.role, role));
    if (isActivated !== undefined)
      conditions.push(eq(users.isActivated, isActivated));
    const where = conditions.length ? and(...conditions) : undefined;

    const [data, totalRows] = await Promise.all([
      this.db
        .select()
        .from(users)
        .where(where)
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ value: count() }).from(users).where(where),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total: totalRows[0]?.value || 0,
      },
    };
  }
  async findById(id: number): Promise<UserDto | null> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));

    return user ?? null;
  }
  async create(data: UserRepositoryPayload): Promise<UserDto> {
    const [user] = await this.db.insert(users).values(data).returning();
    if (!user) throw new Error("Failed to create user");

    return user;
  }
  async update(
    id: number,
    data: UpdateUserRepositoryPayload,
  ): Promise<UserDto | null> {
    const [user] = await this.db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return user ?? null;
  }
  async delete(id: number): Promise<boolean> {
    const deleted = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });

    return deleted.length > 0;
  }
}
