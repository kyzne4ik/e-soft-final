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
]);

export type TelegramJob = z.infer<typeof telegramJobSchema>;
