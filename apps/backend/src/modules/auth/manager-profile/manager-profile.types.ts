export interface IManagerProfileRepository {
  create: (userId: number) => Promise<void>;
}
