import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { timestamps } from "./core";

export const streamStatusEnum = pgEnum("stream_status", [
  "ENROLLING",
  "IN_PROGRESS",
  "FINISHED",
]);

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  ...timestamps,
});

export const streams = pgTable("streams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "restrict" }),
  status: streamStatusEnum("status").notNull().default("ENROLLING"),
  ...timestamps,
});

export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  streamId: integer("stream_id")
    .notNull()
    .references(() => streams.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  startTime: timestamp("start_time", { withTimezone: true }).notNull(),
  endTime: timestamp("end_time", { withTimezone: true }).notNull(),
  meetingLink: text("meeting_link"),
  recordLink: text("record_link"),
  ...timestamps,
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  streamId: integer("stream_id")
    .notNull()
    .references(() => streams.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  repoTemplate: text("repo_template").notNull(),
  deadline: timestamp("deadline", { withTimezone: true }).notNull(),
  ...timestamps,
});
