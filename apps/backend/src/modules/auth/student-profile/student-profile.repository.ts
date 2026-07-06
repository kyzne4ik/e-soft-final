import { DatabaseType, studentProfile } from "@repo/database";
import { IStudentProfileRepository } from "./student-profile.types";

export class StudentProfileRepository implements IStudentProfileRepository {
  constructor(private db: DatabaseType) {}

  async create(userId: number): Promise<void> {
    await this.db
      .insert(studentProfile)
      .values({ userId })
      .onConflictDoNothing();
  }
}
