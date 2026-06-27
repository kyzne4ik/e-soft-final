import { DatabaseType, managerProfile } from "@repo/database";
import { IManagerProfileRepository } from "./manager-profile.types";

export class ManagerProfileRepository implements IManagerProfileRepository {
  constructor(private db: DatabaseType) {}

  async create(userId: number): Promise<void> {
    await this.db
      .insert(managerProfile)
      .values({ userId })
      .onConflictDoNothing();
  }
}
