import { db } from "../../src/index";
import { notifications } from "../../src/db/infra";
import { users } from "../../src/db/core";
import { eq } from "drizzle-orm";

export async function seedInfra() {
  const [student] = await db
    .select()
    .from(users)
    .where(eq(users.email, "student_1@esoft.fake"));

  if (!student) {
    console.log("  ⚠ infra: студент не найден, уведомления пропущены");
    return;
  }

  await db.insert(notifications).values([
    {
      userId: student.id,
      message: "Ментор проверил ваше ДЗ #1 — работа зачтена! Оценка: 92 балла.",
      isSilent: false,
      status: "SENT",
      isRead: true,
    },
    {
      userId: student.id,
      message:
        "Ментор оставил замечания по ДЗ #2. Требуется доработка — проверьте комментарии в PR.",
      isSilent: false,
      status: "SENT",
      isRead: false,
    },
    {
      userId: student.id,
      message: "Напоминание: дедлайн по ДЗ #3 истекает через 24 часа.",
      isSilent: true,
      sendAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: "PENDING",
      isRead: false,
    },
    {
      userId: student.id,
      message: "Ментор оставил комментарий по ДЗ #1.",
      isSilent: true,
      status: "SENT",
      isRead: false,
    },
  ]);

  console.log(`  ✓ infra: 4 уведомления для ${student.email}`);
}
