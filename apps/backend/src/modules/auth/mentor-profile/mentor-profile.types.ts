export interface IMentorProfileRepository {
  create: (userId: number) => Promise<void>;
}
