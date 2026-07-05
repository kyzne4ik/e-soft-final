import { db } from "../../src/index";
import {
  reviews,
  streamMentor,
  streamStudent,
  submission,
} from "../../src/db/academic-activity";
import { tasks } from "../../src/db/content";
import { eq } from "drizzle-orm";

type MentorProfile = { id: number };
type StudentProfile = { id: number };
type Stream = { id: number };

export async function seedAcademicActivity(
  mentorProfiles: MentorProfile[],
  studentProfiles: StudentProfile[],
  activeStream: Stream,
  finishedStream: Stream,
) {
  const [mentor1, mentor2, mentor3, mentor4] = mentorProfiles;

  if (!mentor1 || !mentor2 || !mentor3 || !mentor4) {
    throw new Error("Не удалось создать всех менторов");
  }

  await db.insert(streamMentor).values([
    { streamId: activeStream.id, mentorId: mentor1.id },
    { streamId: activeStream.id, mentorId: mentor2.id },
    { streamId: activeStream.id, mentorId: mentor3.id },
    { streamId: activeStream.id, mentorId: mentor4.id },
    { streamId: finishedStream.id, mentorId: mentor1.id },
    { streamId: finishedStream.id, mentorId: mentor2.id },
  ]);

  const activeStudents = studentProfiles.slice(0, 8);
  const graduatedStudents = studentProfiles.slice(8, 12);

  const mentorAssignment: MentorProfile[] = [
    mentor1,
    mentor1,
    mentor2,
    mentor2,
    mentor3,
    mentor3,
    mentor4,
    mentor4,
  ];

  await db.insert(streamStudent).values([
    ...activeStudents.map((s, i) => ({
      streamId: activeStream.id,
      studentId: s.id,
      mentorId: mentorAssignment[i]?.id,
      status: "ACTIVE" as const,
    })),
    ...graduatedStudents.map((s) => ({
      streamId: finishedStream.id,
      studentId: s.id,
      mentorId: mentor1.id,
      status: "GRADUATED" as const,
    })),
  ]);

  const streamTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.streamId, activeStream.id));

  const [task1, task2, task3] = streamTasks;
  const [student1, student2, student3] = activeStudents;

  if (!task1 || !task2 || !task3)
    throw new Error("Не удалось создать все задания");
  if (!student1 || !student2 || !student3)
    throw new Error("Не уделось создать всех студентов");

  const insertedSubmissions = await db
    .insert(submission)
    .values([
      {
        taskId: task1.id,
        studentId: student1.id,
        repoLink: "https://github.com/student1/hw-1",
        status: "ACCEPTED",
      },
      {
        taskId: task2.id,
        studentId: student1.id,
        repoLink: "https://github.com/student1/hw-2",
        status: "CHANGES_REQUESTED",
      },
      {
        taskId: task1.id,
        studentId: student2.id,
        repoLink: "https://github.com/student2/hw-1",
        status: "REVIEWING",
      },
      {
        taskId: task1.id,
        studentId: student3.id,
        repoLink: "https://github.com/student3/hw-1",
        status: "NEW",
      },
      {
        taskId: task3.id,
        studentId: student3.id,
        repoLink: "https://github.com/student3/hw-3-v2",
        status: "RESUBMITTED",
      },
    ])
    .returning();

  const [sub1Accepted, sub2Changes] = insertedSubmissions;

  if (!sub1Accepted || !sub2Changes)
    throw new Error("Не удалось создать все сдачи");

  await db.insert(reviews).values([
    {
      submissionId: sub1Accepted.id,
      mentorId: mentor1.id,
      score: 92,
      comment:
        "Отличная работа. Semantic Versioning соблюдён, коммиты по Conventional Commits. Мелкие замечания по именованию веток.",
      reviewedAt: new Date("2026-04-19T10:00:00Z"),
    },
    {
      submissionId: sub2Changes.id,
      mentorId: mentor1.id,
      score: 55,
      comment:
        "Не хватает обработки ошибок в useEffect. Нет cleanup-функции — утечка памяти при размонтировании. Посмотри замечания в PR.",
      reviewedAt: new Date("2026-04-26T14:30:00Z"),
    },
  ]);

  console.log(
    `  ✓ academic-activity: ${mentorProfiles.length * 2} связей mentor-stream, ${activeStudents.length + graduatedStudents.length} студентов в потоках, 5 сдач, 2 ревью`,
  );
}
