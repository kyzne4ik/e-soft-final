import { DatabaseType, mentorProfile } from "@repo/database";
import { IMentorProfileRepository } from "./mentor-profile.types";

export class MentorProfileRepository implements IMentorProfileRepository {
  constructor(private db: DatabaseType) {}

  async create(userId: number): Promise<void> {
    await this.db
      .insert(mentorProfile)
      .values({ userId })
      .onConflictDoNothing();
  }
}
