import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { streams, tasks } from "./content";
import { mentorProfile, studentProfile, timestamps } from "./core";

export const submissionStatusEnum = pgEnum("submission_status", [
  "NEW",
  "REVIEWING",
  "CHANGES_REQUESTED",
  "ACCEPTED",
  "RESUBMITTED",
]);

export const studentStatusEnum = pgEnum("student_status", [
  "ACTIVE",
  "GRADUATED",
  "EXPELLED",
]);

export const streamStudent = pgTable(
  "stream_student",
  {
    streamId: integer("stream_id")
      .notNull()
      .references(() => streams.id, { onDelete: "cascade" }),
    studentId: integer("student_id")
      .notNull()
      .references(() => studentProfile.id, { onDelete: "cascade" }),
    mentorId: integer("mentor_id").references(() => mentorProfile.id, {
      onDelete: "set null",
    }),
    status: studentStatusEnum("status").notNull().default("ACTIVE"),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.streamId, t.studentId] })],
);

export const streamMentor = pgTable(
  "stream_mentor",
  {
    streamId: integer("stream_id")
      .notNull()
      .references(() => streams.id, { onDelete: "cascade" }),
    mentorId: integer("mentor_id")
      .notNull()
      .references(() => mentorProfile.id, { onDelete: "cascade" }),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
  },
  (t) => [primaryKey({ columns: [t.streamId, t.mentorId] })],
);

export const submission = pgTable("submission", {
  id: serial("id").primaryKey(),
  taskId: integer("task_id")
    .notNull()
    .references(() => tasks.id, { onDelete: "cascade" }),
  studentId: integer("student_id")
    .notNull()
    .references(() => studentProfile.id, { onDelete: "cascade" }),
  repoLink: text("repo_link").notNull(),
  status: submissionStatusEnum("status").notNull().default("NEW"),
  ...timestamps,
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  submissionId: integer("submission_id")
    .notNull()
    .references(() => submission.id, { onDelete: "cascade" }),
  mentorId: integer("mentor_id")
    .notNull()
    .references(() => mentorProfile.id, { onDelete: "restrict" }),
  score: integer("score").notNull(),
  comment: text("comment").notNull(),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
