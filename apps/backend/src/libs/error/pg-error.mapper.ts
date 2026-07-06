import { getPgError, PG } from "@repo/database";
import { ConflictError } from "./conflict.error";

const TABLE_LABELS: Record<string, string> = {
  users: "пользователи",
  user_telegram: "привязка Telegram",
  student_profile: "профиль студента",
  mentor_profile: "профиль ментора",
  manager_profile: "профиль менеджера",
  courses: "курсы",
  lessons: "уроки",
  tasks: "задания",
  submission: "сданные работы",
  streams: "потоки",
  stream_student: "студенты потока",
  stream_mentor: "менторы потока",
  reviews: "ревью",
  notifications: "уведомления",
};

const tableLabel = (table: string | undefined): string =>
  table ? (TABLE_LABELS[table] ?? `"${table}"`) : "связанные данные";

export const pgErrorToHttp = (e: unknown): ConflictError | null => {
  const pg = getPgError(e);
  if (!pg) return null;

  switch (pg.code) {
    case PG.FK:
      return new ConflictError(
        `Невозможно выполнить операцию: есть связанные записи (${tableLabel(pg.table)})`,
      );
    case PG.UNIQUE:
      return new ConflictError("Запись с такими данными уже существует");
    default:
      return null;
  }
};
