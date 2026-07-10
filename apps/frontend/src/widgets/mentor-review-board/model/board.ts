import type {
  KanbanTone,
  KanbanCard,
  KanbanBoard,
} from "@repo/ui/organisms/kanban";
import type { MentorSubmissionResponse, SubmissionStatus } from "@repo/schemas";
import { toPerson } from "@/features/open-submission";

interface StatusColumnConfig {
  id: SubmissionStatus;
  title: string;
  tone: KanbanTone;
}

export const STATUS_COLUMNS: readonly StatusColumnConfig[] = [
  { id: "NEW", title: "Поступили", tone: "blue" },
  { id: "REVIEWING", title: "На ревью", tone: "amber" },
  { id: "CHANGES_REQUESTED", title: "Доработка", tone: "red" },
  { id: "RESUBMITTED", title: "Доработано", tone: "violet" },
  { id: "ACCEPTED", title: "Зачтено", tone: "green" },
];

const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
});

const toDate = (value: unknown): Date | null => {
  if (value == null) return null;
  const date = new Date(value as string);
  return Number.isNaN(date.getTime()) ? null : date;
};

const submissionToCard = (s: MentorSubmissionResponse): KanbanCard => {
  const student = toPerson(s.studentId, s.studentFirstName, s.studentLastName);
  const deadline = toDate(s.taskDeadline);
  const overdue =
    deadline != null &&
    s.status !== "ACCEPTED" &&
    deadline.getTime() < Date.now();

  return {
    id: String(s.id),
    title: student.name,
    assignees: [
      {
        name: student.name,
        initials: student.initials,
        color: student.color,
      },
    ],
    project: s.taskTitle,
    date: deadline
      ? overdue
        ? `просрочено · ${dateFormatter.format(deadline)}`
        : dateFormatter.format(deadline)
      : undefined,
    meta: s,
  };
};

export const buildBoard = (
  submissions: MentorSubmissionResponse[],
): KanbanBoard => ({
  columns: STATUS_COLUMNS.map((column) => ({
    ...column,
    cards: submissions
      .filter((submission) => submission.status === column.id)
      .map(submissionToCard),
  })),
});
