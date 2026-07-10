import { z } from "zod";

export const updateLessonSchema = z
  .object({
    streamId: z.string().min(1, "Выберите поток"),
    title: z.string().min(1, "Название обязательно"),
    type: z.string(),
    host: z.string(),
    description: z.string(),
    startTime: z.string().min(1, "Укажите время начала"),
    endTime: z.string().min(1, "Укажите время окончания"),
    meetingLink: z.union([
      z.literal(""),
      z.string().url("Некорректная ссылка"),
    ]),
    recordLink: z.union([z.literal(""), z.string().url("Некорректная ссылка")]),
  })
  .refine(
    (data) =>
      !data.startTime ||
      !data.endTime ||
      new Date(data.endTime) > new Date(data.startTime),
    {
      message: "Время окончания должно быть позже начала",
      path: ["endTime"],
    },
  );

export type UpdateLessonFormData = z.infer<typeof updateLessonSchema>;
