import { StringToolKit, escapeHtml } from "@utils";

interface MentorSubmissionCtx {
  studentFirstName: string | null;
  studentLastName: string | null;
  taskTitle: string;
  link: string;
}

interface StudentReviewCtx {
  taskTitle: string;
  score: number;
  link: string;
}

const studentDisplayName = (
  first: string | null,
  last: string | null,
): string =>
  [first, last]
    .filter((s): s is string => s != null)
    .map(escapeHtml)
    .join(" ") || "Студент";

const openLink = (link: string, label: string): string =>
  `🔗 <a href="${escapeHtml(link)}">${escapeHtml(label)}</a>`;

export class SubmissionTemplate {
  static submitted(ctx: MentorSubmissionCtx): string {
    return StringToolKit.compose([
      "📩 <b>Новая сдача на проверку</b>",
      "",
      `👤 ${studentDisplayName(ctx.studentFirstName, ctx.studentLastName)}`,
      `📚 <b>${escapeHtml(ctx.taskTitle)}</b>`,
      "",
      openLink(ctx.link, "Открыть карточку сдачи"),
    ]);
  }

  static resubmitted(ctx: MentorSubmissionCtx): string {
    return StringToolKit.compose([
      "🔄 <b>Работа отправлена на перепроверку</b>",
      "",
      `👤 ${studentDisplayName(ctx.studentFirstName, ctx.studentLastName)}`,
      `📚 <b>${escapeHtml(ctx.taskTitle)}</b>`,
      "",
      openLink(ctx.link, "Открыть карточку сдачи"),
    ]);
  }

  static reviewAccepted(ctx: StudentReviewCtx): string {
    return StringToolKit.compose([
      "✅ <b>Ваша работа зачтена</b>",
      "",
      `📚 <b>${escapeHtml(ctx.taskTitle)}</b>`,
      `⭐ Оценка: <b>${ctx.score} / 100</b>`,
      "",
      openLink(ctx.link, "Открыть задание"),
    ]);
  }

  static reviewChangesRequested(ctx: StudentReviewCtx): string {
    return StringToolKit.compose([
      "📝 <b>Работа отправлена на доработку</b>",
      "",
      `📚 <b>${escapeHtml(ctx.taskTitle)}</b>`,
      `⭐ Оценка: <b>${ctx.score} / 100</b>`,
      "",
      "Загляните в карточку — там комментарий ментора.",
      openLink(ctx.link, "Открыть задание"),
    ]);
  }
}
