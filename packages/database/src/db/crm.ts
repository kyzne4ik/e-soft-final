import { integer, pgEnum, pgTable, serial, text } from "drizzle-orm/pg-core";
import { managerProfile, timestamps, users } from "./core";

export const leadStatusEnum = pgEnum("lead_status", [
  "NEW",
  "IN_REVIEW",
  "ACCEPTED",
  "REJECTED",
  "IGNORED",
  "LOST",
  "ARCHIVED",
]);

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  convertedUserId: integer("converted_user_id").references(() => users.id, {
    onDelete: "set null",
  }),
  managerId: integer("manager_id").references(() => managerProfile.id, {
    onDelete: "set null",
  }),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  patronymic: text("patronymic"),
  email: text("email").notNull(),
  phone: text("phone"),
  telegram: text("telegram"),
  experience: text("experience"),
  testResult: text("test_result"),
  status: leadStatusEnum("status").notNull().default("NEW"),
  ...timestamps,
});
