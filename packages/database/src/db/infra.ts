import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { timestamps, users } from "./core";

export const notificationStatus = pgEnum("notification_status", [
  "PENDING",
  "SENT",
  "FAILED",
]);

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  message: text("message").notNull(),
  isSilent: boolean("is_silent").notNull().default(false),
  sendAt: timestamp("send_at", { withTimezone: true }),
  status: notificationStatus("status").notNull().default("PENDING"),
  isRead: boolean("is_read").notNull().default(false),
  ...timestamps,
});
