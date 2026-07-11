import { db } from "../../src/index";
import { notifications } from "../../src/db/infra";
import { users } from "../../src/db/core";
import { eq } from "drizzle-orm";

export async function seedInfra() {
  const [student1] = await db
    .select()
    .from(users)
    .where(eq(users.email, "student_1@esoft.fake"));

  const [student2] = await db
    .select()
    .from(users)
    .where(eq(users.email, "student_2@esoft.fake"));

  if (!student1) {
    console.log("  ⚠ infra: student_1 не найден, уведомления пропущены");
    return;
  }

  const now = new Date();
  const in24h = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const in2d = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  await db.insert(notifications).values([
    {
      userId: student1.id,
      message: "Ментор проверил ваше ДЗ #1 — работа зачтена! Оценка: 92 балла.",
      isSilent: false,
      status: "SENT",
      isRead: true,
    },
    {
      userId: student1.id,
      message: "Ментор оставил комментарий по ДЗ #1.",
      isSilent: true,
      status: "SENT",
      isRead: true,
    },
    {
      userId: student1.id,
      message:
        "Ментор оставил замечания по ДЗ #2. Требуется доработка — проверьте комментарии в PR.",
      isSilent: false,
      status: "SENT",
      isRead: false,
    },
    {
      userId: student1.id,
      message: "Напоминание: дедлайн по ДЗ #3 истекает через 24 часа.",
      isSilent: true,
      sendAt: in24h,
      status: "PENDING",
      isRead: false,
    },
    {
      userId: student1.id,
      message: "Напоминание: дедлайн по ДЗ #4 истекает через 48 часов.",
      isSilent: true,
      sendAt: in2d,
      status: "PENDING",
      isRead: false,
    },
    ...(student2
      ? [
          {
            userId: student2.id,
            message: "Ментор проверил ваше ДЗ #1 — зачтено! Оценка: 88 баллов.",
            isSilent: false,
            status: "SENT" as const,
            isRead: false,
          },
        ]
      : []),
  ]);

  const total = student2 ? 6 : 5;
  console.log(
    `  ✓ infra: ${total} уведомлений (student_1${student2 ? " + student_2" : ""})`,
  );
}
