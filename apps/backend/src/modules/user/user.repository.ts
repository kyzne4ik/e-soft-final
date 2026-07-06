import {
  DatabaseType,
  users,
  userTelegram,
  studentProfile,
  mentorProfile,
  managerProfile,
} from "@repo/database";
import type { PaginationResponse } from "@types";
import type { UserDto } from "@repo/schemas";
import {
  IUsersRepository,
  UserFilters,
  UserRepositoryPayload,
  UpdateUserRepositoryPayload,
  UserWithProfileDto,
} from "./user.types";
import { count, desc, eq, and } from "drizzle-orm";
import { toUserWithProfile } from "./user.mapper";
import { PROFILE_BY_ROLE } from "./const";

export class UserRepository implements IUsersRepository {
  constructor(private db: DatabaseType) {}

  async findAll(
    filters: UserFilters = {},
  ): Promise<PaginationResponse<UserWithProfileDto>> {
    const { role, isActivated, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (role) conditions.push(eq(users.role, role));
    if (isActivated !== undefined)
      conditions.push(eq(users.isActivated, isActivated));
    const where = conditions.length ? and(...conditions) : undefined;

    const [rows, totalRows] = await Promise.all([
      this.db
        .select({
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          patronymic: users.patronymic,
          email: users.email,
          passwordHash: users.passwordHash,
          role: users.role,
          isActivated: users.isActivated,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          studentProfileId: studentProfile.id,
          mentorProfileId: mentorProfile.id,
          managerProfileId: managerProfile.id,
        })
        .from(users)
        .leftJoin(studentProfile, eq(studentProfile.userId, users.id))
        .leftJoin(mentorProfile, eq(mentorProfile.userId, users.id))
        .leftJoin(managerProfile, eq(managerProfile.userId, users.id))
        .where(where)
        .orderBy(desc(users.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ value: count() }).from(users).where(where),
    ]);

    return {
      data: rows.map(toUserWithProfile),
      meta: { page, limit, total: totalRows[0]?.value || 0 },
    };
  }

  async findById(id: number): Promise<UserWithProfileDto | null> {
    const [row] = await this.db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        patronymic: users.patronymic,
        email: users.email,
        passwordHash: users.passwordHash,
        role: users.role,
        isActivated: users.isActivated,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        studentProfileId: studentProfile.id,
        mentorProfileId: mentorProfile.id,
        managerProfileId: managerProfile.id,
      })
      .from(users)
      .leftJoin(studentProfile, eq(studentProfile.userId, users.id))
      .leftJoin(mentorProfile, eq(mentorProfile.userId, users.id))
      .leftJoin(managerProfile, eq(managerProfile.userId, users.id))
      .where(eq(users.id, id));

    return row ? toUserWithProfile(row) : null;
  }

  async findByEmail(email: string): Promise<UserWithProfileDto | null> {
    const [row] = await this.db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        patronymic: users.patronymic,
        email: users.email,
        passwordHash: users.passwordHash,
        role: users.role,
        isActivated: users.isActivated,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
        studentProfileId: studentProfile.id,
        mentorProfileId: mentorProfile.id,
        managerProfileId: managerProfile.id,
      })
      .from(users)
      .leftJoin(studentProfile, eq(studentProfile.userId, users.id))
      .leftJoin(mentorProfile, eq(mentorProfile.userId, users.id))
      .leftJoin(managerProfile, eq(managerProfile.userId, users.id))
      .where(eq(users.email, email));

    return row ? toUserWithProfile(row) : null;
  }

  async findByTgId(tgId: string): Promise<UserDto | null> {
    const [row] = await this.db
      .select()
      .from(users)
      .innerJoin(userTelegram, eq(userTelegram.userId, users.id))
      .where(eq(userTelegram.tgId, tgId));

    return row?.users ?? null;
  }

  async createWithProfile(
    data: UserRepositoryPayload,
  ): Promise<UserWithProfileDto> {
    return this.db.transaction(async (tx) => {
      const [user] = await tx.insert(users).values(data).returning();
      if (!user) throw new Error("Ошибка при создании пользователя");

      const profileTable = PROFILE_BY_ROLE[user.role];
      if (!profileTable) {
        return { ...user, profileId: null };
      }

      const [profile] = await tx
        .insert(profileTable)
        .values({ userId: user.id })
        .returning({ id: profileTable.id });
      return { ...user, profileId: profile?.id ?? null };
    });
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
