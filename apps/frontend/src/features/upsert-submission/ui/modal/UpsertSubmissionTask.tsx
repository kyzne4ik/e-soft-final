import { Icon } from "@repo/ui/atoms/icon";
import type { TaskResponse } from "@repo/schemas";
import { Skeleton } from "@repo/ui/atoms/skeleton";
import css from "./UpsertSubmissionModal.module.css";
import { useSubmissionDetail } from "./useSubmissionDetail";
import { StatusBadge } from "@repo/ui/molecules/status-badge";
import { DeadlineCountdown } from "@repo/ui/molecules/deadline-countdown";
import { UpsertSubmissionReviewList } from "./UpsertSubmissionReviewList";

interface UpsertSubmissionTaskProps {
  task: TaskResponse;
  isOpen: boolean;
}

function UpsertSubmissionTaskSkeleton() {
  return (
    <div className={css.rows}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} height={24} border="var(--radius-sm)" />
      ))}
    </div>
  );
}

export function UpsertSubmissionTask({
  isOpen,
  task,
}: UpsertSubmissionTaskProps) {
  const { submission, reviews, status, isAccepted, hours, isLoading } =
    useSubmissionDetail(task, isOpen);

  if (isLoading) return <UpsertSubmissionTaskSkeleton />;

  return (
    <div className={css.rows}>
      <div className={css.head}>
        {status ? <StatusBadge status={status} kind="submission" /> : <span />}
        {!isAccepted && hours > 0 ? (
          <div className={css.countdown}>
            <DeadlineCountdown targetHours={hours} />
          </div>
        ) : null}
      </div>
      <div className={css.section}>
        <div className={css.section_title}>Техническое задание</div>
        <p className={css.description}>{task.description}</p>
      </div>
      <div className={css.section}>
        <div className={css.section_title}>История ревью</div>
        <UpsertSubmissionReviewList
          reviews={reviews}
          submissionStatus={submission?.status ?? null}
        />
      </div>
      {isAccepted && (
        <div className={css.closed_notice}>
          <Icon name="circle-check" size={18} />
          Работа зачтена — сдача закрыта
        </div>
      )}
    </div>
  );
}
