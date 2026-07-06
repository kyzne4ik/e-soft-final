import {
  LeadDto,
  LeadStatus,
  LeadQuery,
  CreateManualLeadPayload,
  UpsertLeadRepositoryPayload,
} from "@repo/schemas";
import { PaginationResponse } from "@types";
import { and, count, desc, eq, inArray, isNull } from "drizzle-orm";
import { DatabaseType, leads } from "@repo/database";
import { ILeadRepository } from "./lead.types";

export class LeadRepository implements ILeadRepository {
  constructor(private db: DatabaseType) {}

  async findAll(filters: LeadQuery = {}): Promise<PaginationResponse<LeadDto>> {
    const { targetStreamId, status, managerId, page = 1, limit = 20 } = filters;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (targetStreamId !== undefined)
      conditions.push(eq(leads.targetStreamId, targetStreamId));
    if (status !== undefined) conditions.push(eq(leads.status, status));
    if (managerId !== undefined)
      conditions.push(eq(leads.managerId, managerId));
    const where = conditions.length ? and(...conditions) : undefined;

    const [data, totalRows] = await Promise.all([
      this.db
        .select()
        .from(leads)
        .where(where)
        .orderBy(desc(leads.createdAt))
        .limit(limit)
        .offset(offset),
      this.db.select({ value: count() }).from(leads).where(where),
    ]);

    return {
      data,
      meta: { page, limit, total: totalRows[0]?.value || 0 },
    };
  }

  async findById(id: number): Promise<LeadDto | null> {
    const [row] = await this.db.select().from(leads).where(eq(leads.id, id));

    return row ?? null;
  }

  async create(data: CreateManualLeadPayload): Promise<LeadDto> {
    const [row] = await this.db.insert(leads).values(data).returning();

    if (!row) throw new Error("Ошибка при создании заявки");

    return row;
  }

  async upsertByEmail(data: UpsertLeadRepositoryPayload): Promise<LeadDto> {
    const [existing] = await this.db
      .select()
      .from(leads)
      .where(
        and(
          eq(leads.email, data.email),
          eq(leads.targetStreamId, data.targetStreamId),
          inArray(leads.status, ["NEW", "IN_REVIEW"]),
        ),
      )
      .orderBy(desc(leads.createdAt))
      .limit(1);

    if (existing) {
      const [row] = await this.db
        .update(leads)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(leads.id, existing.id))
        .returning();

      if (!row) throw new Error("Ошибка при обновлении заявки");

      return row;
    }

    return this.create(data);
  }

  async updateStatus(
    id: number,
    status: LeadStatus,
    managerId: number,
  ): Promise<LeadDto | null> {
    const [row] = await this.db
      .update(leads)
      .set({ status, managerId, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();

    return row ?? null;
  }

  async linkConvertedUser(email: string, userId: number): Promise<void> {
    await this.db
      .update(leads)
      .set({ convertedUserId: userId, updatedAt: new Date() })
      .where(
        and(
          eq(leads.email, email),
          eq(leads.status, "ACCEPTED"),
          isNull(leads.convertedUserId),
        ),
      );
  }
}
