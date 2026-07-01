import { LessonDto } from "@repo/schemas";
import { DateToolKit, StringToolKit, escapeHtml, linkLine } from "@utils";

export class LessonTemplate {
  static announce(lesson: LessonDto): string {
    return StringToolKit.compose([
      "📢 <b>Скоро состоится лекция!</b>",
      "",
      `📚 <b>${escapeHtml(lesson.title)}</b>`,
      `🗓 ${DateToolKit.dateFmt.format(lesson.startTime)}`,
      `🕐 Начало в ${DateToolKit.timeFmt.format(lesson.startTime)} (ЕКБ)`,
      linkLine(lesson.meetingLink),
    ]);
  }

  static reminder(lesson: LessonDto): string {
    return StringToolKit.compose([
      "⏰ <b>Лекция начнётся через 15 минут</b>",
      "",
      `📚 <b>${escapeHtml(lesson.title)}</b>`,
      `🕐 Начало в ${DateToolKit.timeFmt.format(lesson.startTime)} (ЕКБ)`,
      linkLine(lesson.meetingLink),
    ]);
  }

  static cancel(lesson: Pick<LessonDto, "title" | "startTime">): string {
    return StringToolKit.compose([
      "❌ <b>Занятие отменено</b>",
      "",
      `📚 <b>${escapeHtml(lesson.title)}</b>`,
      `🗓 ${DateToolKit.dateFmt.format(lesson.startTime)}, ${DateToolKit.timeFmt.format(lesson.startTime)} (ЕКБ)`,
      "",
      "Следите за расписанием — о новой дате сообщим отдельно.",
    ]);
  }

  static reschedule(lesson: LessonDto): string {
    return StringToolKit.compose([
      "⚠️ <b>Занятие перенесено</b>",
      "",
      `📚 <b>${escapeHtml(lesson.title)}</b>`,
      `🗓 Новое время: ${DateToolKit.dateFmt.format(lesson.startTime)}, ${DateToolKit.timeFmt.format(lesson.startTime)} (ЕКБ)`,
      linkLine(lesson.meetingLink),
    ]);
  }
}
