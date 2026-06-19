import { faker } from "@faker-js/faker/locale/ru";
import bcrypt from "bcrypt";
import { db } from "../../src/index";
import {
  managerProfile,
  mentorProfile,
  studentProfile,
  userTelegram,
  users,
} from "../../src/db/core";

const hash = (pwd: string) => bcrypt.hash(pwd, 10);

export async function seedCore() {
  const mentorRows = await db
    .insert(users)
    .values([
      {
        firstName: "Евгений",
        lastName: "Сапов",
        email: "sapov@esoft.fake",
        passwordHash: await hash("password123"),
        role: "MENTOR",
        isActivated: true,
      },
      {
        firstName: "Владислав",
        lastName: "Задорожнюк",
        email: "zadorozhnuk@esoft.fake",
        passwordHash: await hash("password123"),
        role: "MENTOR",
        isActivated: true,
      },
      {
        firstName: "Алексей",
        lastName: "Андреев",
        email: "andreev@esoft.fake",
        passwordHash: await hash("password123"),
        role: "MENTOR",
        isActivated: true,
      },
      {
        firstName: "Илья",
        lastName: "Киреев",
        email: "kireev@esoft.fake",
        passwordHash: await hash("password123"),
        role: "MENTOR",
        isActivated: true,
      },
    ])
    .returning();

  const mentorProfiles = await db
    .insert(mentorProfile)
    .values(mentorRows.map((u) => ({ userId: u.id })))
    .returning();

  const [managerUser] = await db
    .insert(users)
    .values([
      {
        firstName: "Наталья",
        lastName: "Нестеренко",
        email: "nesterenko@esoft.fake",
        passwordHash: await hash("password123"),
        role: "MANAGER",
        isActivated: true,
      },
    ])
    .returning();

  if (!managerUser) throw new Error("Не удалось создать менеджера");

  const [managerProf] = await db
    .insert(managerProfile)
    .values([{ userId: managerUser.id }])
    .returning();

  await db.insert(users).values([
    {
      firstName: "Admin",
      lastName: "Esoft",
      email: "admin@esoft.fake",
      passwordHash: await hash("admin123"),
      role: "ADMIN",
      isActivated: true,
    },
  ]);

  const studentCount = 12;
  const studentUserRows = await db
    .insert(users)
    .values(
      await Promise.all(
        Array.from({ length: studentCount }, async (_, i) => ({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          patronymic:
            Math.random() > 0.4 ? faker.person.middleName() : undefined,
          email: `student_${i + 1}@esoft.fake`,
          passwordHash: await hash("password123"),
          role: "STUDENT" as const,
          isActivated: true,
        })),
      ),
    )
    .returning();

  const studentProfiles = await db
    .insert(studentProfile)
    .values(studentUserRows.map((u) => ({ userId: u.id })))
    .returning();

  const tgCandidates = [
    ...mentorRows,
    managerUser,
    ...studentUserRows.slice(0, 6),
  ];

  await db.insert(userTelegram).values(
    tgCandidates.map((u, i) => ({
      userId: u.id,
      tgId: `tg_${100000 + i}`,
      tgUsername: `${u.firstName.toLowerCase()}_${u.lastName.toLowerCase()}`,
      linkedAt: new Date(),
    })),
  );

  console.log(
    `  ✓ core: ${mentorRows.length} менторов, 1 менеджер, 1 админ, ${studentCount} студентов`,
  );

  return { mentorProfiles, managerProf, studentProfiles };
}
