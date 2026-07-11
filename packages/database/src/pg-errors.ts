import { DatabaseError } from "pg";

export { DatabaseError } from "pg";

export const PG = { UNIQUE: "23505", FK: "23503" } as const;

/**
 * Возвращает оригинальный DatabaseError из ошибки драйвера.
 * drizzle оборачивает ошибку в DrizzleQueryError, а сам DatabaseError
 * кладёт в `.cause` — разворачиваем оба случая.
 */
export const getPgError = (e: unknown): DatabaseError | null => {
  if (e instanceof DatabaseError) return e;
  if (
    e &&
    typeof e === "object" &&
    "cause" in e &&
    e.cause instanceof DatabaseError
  )
    return e.cause;
  return null;
};

export const isPgError = (e: unknown, code: string): boolean =>
  getPgError(e)?.code === code;
