import { db } from "../../src/index";
import {
  streamMentor,
  streamStudent,
  submission,
  reviews,
} from "../../src/db/academic-activity";
import { tasks } from "../../src/db/content";
import { eq } from "drizzle-orm";

type ProfileRow = { id: number };
type StreamRow = { id: number };

export async function seedAcademicActivity(
  mentorProfiles: ProfileRow[],
  studentProfiles: ProfileRow[],
  activeStream: StreamRow,
  finishedStream: StreamRow,
) {
  const [m1, m2, m3, m4] = mentorProfiles;
  if (!m1 || !m2 || !m3 || !m4) throw new Error("Ожидается 4 ментора");

  await db.insert(streamMentor).values([
    { streamId: activeStream.id, mentorId: m1.id },
    { streamId: activeStream.id, mentorId: m2.id },
    { streamId: activeStream.id, mentorId: m3.id },
    { streamId: activeStream.id, mentorId: m4.id },
    { streamId: finishedStream.id, mentorId: m1.id },
    { streamId: finishedStream.id, mentorId: m2.id },
  ]);

  const active = studentProfiles.slice(0, 8);
  const graduated = studentProfiles.slice(8, 12);

  const mentorOf: ProfileRow[] = [m1, m1, m2, m2, m3, m3, m4, m4];

  await db.insert(streamStudent).values([
    ...active.map((s, i) => ({
      streamId: activeStream.id,
      studentId: s.id,
      mentorId: mentorOf[i]!.id,
      status: "ACTIVE" as const,
      joinedAt: new Date("2026-04-01T00:00:00Z"),
    })),
    ...graduated.map((s) => ({
      streamId: finishedStream.id,
      studentId: s.id,
      mentorId: m1.id,
      status: "GRADUATED" as const,
      joinedAt: new Date("2025-09-01T00:00:00Z"),
    })),
  ]);

  const streamTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.streamId, activeStream.id));

  const [t1, t2, t3, t4, t5] = streamTasks;
  if (!t1 || !t2 || !t3 || !t4 || !t5)
    throw new Error("Ожидается минимум 5 задач в активном потоке");

  const [s1, s2, s3, s4, s5] = active;
  if (!s1 || !s2 || !s3 || !s4 || !s5)
    throw new Error("Ожидается минимум 5 активных студентов");

  const insertedSubmissions = await db
    .insert(submission)
    .values([
      {
        taskId: t1.id,
        studentId: s1.id,
        repoLink: "https://github.com/student1/hw-1",
        status: "ACCEPTED",
      },
      {
        taskId: t2.id,
        studentId: s1.id,
        repoLink: "https://github.com/student1/hw-2",
        status: "CHANGES_REQUESTED",
      },
      {
        taskId: t3.id,
        studentId: s1.id,
        repoLink: "https://github.com/student1/hw-3",
        status: "REVIEWING",
      },
      {
        taskId: t1.id,
        studentId: s2.id,
        repoLink: "https://github.com/student2/hw-1",
        status: "REVIEWING",
      },
      {
        taskId: t2.id,
        studentId: s2.id,
        repoLink: "https://github.com/student2/hw-2",
        status: "ACCEPTED",
      },
      {
        taskId: t1.id,
        studentId: s3.id,
        repoLink: "https://github.com/student3/hw-1",
        status: "NEW",
      },
      {
        taskId: t3.id,
        studentId: s3.id,
        repoLink: "https://github.com/student3/hw-3",
        status: "RESUBMITTED",
      },
      {
        taskId: t1.id,
        studentId: s4.id,
        repoLink: "https://github.com/student4/hw-1",
        status: "ACCEPTED",
      },
      {
        taskId: t4.id,
        studentId: s4.id,
        repoLink: "https://github.com/student4/hw-4",
        status: "NEW",
      },
      {
        taskId: t1.id,
        studentId: s5.id,
        repoLink: "https://github.com/student5/hw-1",
        status: "ACCEPTED",
      },
      {
        taskId: t5.id,
        studentId: s5.id,
        repoLink: "https://github.com/student5/hw-5",
        status: "CHANGES_REQUESTED",
      },
    ])
    .returning();

  const byKey = (taskId: number, studentId: number) =>
    insertedSubmissions.find(
      (s) => s.taskId === taskId && s.studentId === studentId,
    );

  const sub1Accepted = byKey(t1.id, s1.id)!;
  const sub1ChangesReq = byKey(t2.id, s1.id)!;
  const sub2Accepted = byKey(t2.id, s2.id)!;
  const sub4Accepted = byKey(t1.id, s4.id)!;
  const sub5Accepted = byKey(t1.id, s5.id)!;
  const sub5ChangesReq = byKey(t5.id, s5.id)!;

  await db.insert(reviews).values([
    {
      submissionId: sub1Accepted.id,
      mentorId: m1.id,
      score: 92,
      comment:
        "Отличная работа. Semantic Versioning соблюдён, коммиты по Conventional Commits. Мелкие замечания по именованию веток.",
      reviewedAt: new Date("2026-04-19T10:00:00Z"),
    },
    {
      submissionId: sub1ChangesReq.id,
      mentorId: m1.id,
      score: 55,
      comment:
        "Не хватает обработки ошибок в useEffect. Нет cleanup-функции — утечка памяти при размонтировании. Посмотри замечания в PR.",
      reviewedAt: new Date("2026-04-26T14:30:00Z"),
    },
    {
      submissionId: sub2Accepted.id,
      mentorId: m2.id,
      score: 88,
      comment:
        "Хорошая работа с формами. Zod-схема чистая. Рекомендую добавить тест на граничные значения.",
      reviewedAt: new Date("2026-04-28T09:15:00Z"),
    },
    {
      submissionId: sub4Accepted.id,
      mentorId: m3.id,
      score: 95,
      comment:
        "Превосходно. Git-история линейная, PR описан чётко. Ветки правильно названы.",
      reviewedAt: new Date("2026-04-20T11:00:00Z"),
    },
    {
      submissionId: sub5Accepted.id,
      mentorId: m4.id,
      score: 78,
      comment:
        "Работа сдана вовремя. Небольшие замечания по структуре коммитов, но в целом хорошо.",
      reviewedAt: new Date("2026-04-21T16:00:00Z"),
    },
    {
      submissionId: sub5ChangesReq.id,
      mentorId: m4.id,
      score: 45,
      comment:
        "Нет обработки ошибок при запросах. useMemo использован неверно — пересчитывается каждый рендер. Нужна доработка.",
      reviewedAt: new Date("2026-05-10T13:00:00Z"),
    },
  ]);

  console.log(
    `  ✓ academic-activity: ${mentorProfiles.length + 2} mentor-stream, ` +
      `${active.length + graduated.length} студентов, ` +
      `${insertedSubmissions.length} сдач, 6 ревью`,
  );
}
