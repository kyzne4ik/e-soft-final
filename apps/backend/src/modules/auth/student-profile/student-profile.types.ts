export interface IStudentProfileRepository {
  create: (userId: number) => Promise<void>;
}
