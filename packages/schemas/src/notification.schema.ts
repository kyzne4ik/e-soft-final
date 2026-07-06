import z from "zod";
import { paginationSchema } from "./common.schema";

export const notificationStatusSchema = z.enum(["PENDING", "SENT", "FAILED"]);

export type NotificationStatus = z.infer<typeof notificationStatusSchema>;

export const notificationSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  message: z.string(),
  isSilent: z.boolean(),
  sendAt: z.coerce.date().nullable(),
  status: notificationStatusSchema,
  isRead: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type NotificationDto = z.infer<typeof notificationSchema>;

export const notificationResponseSchema = z.object({
  id: z.number().int(),
  message: z.string(),
  isSilent: z.boolean(),
  sendAt: z.coerce.date().nullable(),
  status: notificationStatusSchema,
  isRead: z.boolean(),
});

export type NotificationResponse = z.infer<typeof notificationResponseSchema>;

export const createNotificationPayloadSchema = z.object({
  userId: z.number().int().positive(),
  message: z.string().min(1),
  isSilent: z.boolean().optional(),
  sendAt: z.coerce.date().nullable().optional(),
});

export type CreateNotificationPayload = z.infer<
  typeof createNotificationPayloadSchema
>;

export const notificationQuerySchema = z
  .object({
    isRead: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),
  })
  .merge(paginationSchema.partial());

export type NotificationQuery = z.infer<typeof notificationQuerySchema>;

export const unreadCountResponseSchema = z.object({
  count: z.number().int(),
});

export type UnreadCountResponse = z.infer<typeof unreadCountResponseSchema>;
