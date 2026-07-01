import z from "zod";

export const QUEUE_NAMES = {
  telegram: "telegram",
  email: "email",
};

export const telegramJobSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("user-dm"),
    notificationId: z.number().int(),
  }),
  z.object({
    kind: z.literal("lesson-announce"),
    lessonId: z.number().int(),
  }),
  z.object({
    kind: z.literal("lesson-reminder"),
    lessonId: z.number().int(),
  }),
  z.object({
    kind: z.literal("lesson-reschedule"),
    lessonId: z.number().int(),
  }),
  z.object({
    kind: z.literal("lesson-cancel"),
    streamId: z.number().int(),
    title: z.string(),
    startTime: z.coerce.date(),
  }),
]);

export type TelegramJob = z.infer<typeof telegramJobSchema>;
