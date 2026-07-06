import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
};

export const rolesEnum = pgEnum("roles", [
  "ADMIN",
  "MANAGER",
  "MENTOR",
  "STUDENT",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  patronymic: text("patronymic"),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: rolesEnum("role").notNull().default("STUDENT"),
  isActivated: boolean("is_activated").notNull().default(false),
  ...timestamps,
});

export const userTelegram = pgTable("user_telegram", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  tgId: text("tg_id").unique(),
  tgUsername: text("tg_username"),
  linkedAt: timestamp("linked_at", { withTimezone: true }),
});

export const studentProfile = pgTable("student_profile", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const mentorProfile = pgTable("mentor_profile", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});

export const managerProfile = pgTable("manager_profile", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: "cascade" }),
  ...timestamps,
});
