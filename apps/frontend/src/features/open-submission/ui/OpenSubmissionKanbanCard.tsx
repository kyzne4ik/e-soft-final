import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { Kanban, type KanbanCard } from "@repo/ui/organisms/kanban";
import { Avatar } from "@repo/ui/atoms/avatar";
import { Icon } from "@repo/ui/atoms/icon";
import type { MentorSubmissionResponse } from "@repo/schemas";
import { SubmissionReviewModal } from "./SubmissionReviewModal";
import { toPerson } from "../model/person";
import { prettyLink, formatDeadline } from "../model/formatters";
import css from "./OpenSubmissionKanbanCard.module.css";

export interface OpenSubmissionKanbanCardProps {
  card: KanbanCard;
  columnId: string;
}

export function OpenSubmissionKanbanCard({
  card,
  columnId,
}: OpenSubmissionKanbanCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const submission = card.meta as MentorSubmissionResponse | undefined;

  if (!submission) {
    return (
      <>
        <Kanban.Card
          card={card}
          columnId={columnId}
          className={css.clickable}
          onClick={onOpen}
        />
        <SubmissionReviewModal
          submissionId={Number(card.id)}
          isOpen={isOpen}
          onClose={onClose}
        />
      </>
    );
  }

  const student = toPerson(
    submission.studentId,
    submission.studentFirstName,
    submission.studentLastName,
  );

  const deadline = formatDeadline(submission.taskDeadline);
  const isOverdue =
    submission.taskDeadline != null &&
    submission.status !== "ACCEPTED" &&
    new Date(submission.taskDeadline).getTime() < Date.now();

  return (
    <>
      <Kanban.Card
        card={card}
        columnId={columnId}
        className={css.card}
        onClick={onOpen}
      >
        <div className={css.head}>
          <Avatar person={student} size={36} />
          <div className={css.head_text}>
            <span className={css.name}>{student.name}</span>
            <span className={css.task}>{submission.taskTitle}</span>
          </div>
        </div>

        <div className={css.footer}>
          <span className={css.repo}>
            <Icon name="github" size={13} />
            {prettyLink(submission.repoLink)}
          </span>
          {deadline && (
            <span className={`${css.deadline} ${isOverdue ? css.overdue : ""}`}>
              <Icon name="clock" size={13} />
              {deadline}
            </span>
          )}
        </div>
      </Kanban.Card>

      <SubmissionReviewModal
        submissionId={submission.id}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
