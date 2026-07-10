import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import type { GradeModalState } from "../../model/useGradeModal";

interface SubmissionFooterProps {
  submissionId: number;
  canTake: boolean;
  isTaking: boolean;
  lastScore: number | null;
  onTake: () => void;
  onGrade: (state: GradeModalState) => void;
}

export function SubmissionFooter({
  canTake,
  isTaking,
  lastScore,
  onTake,
  onGrade,
}: SubmissionFooterProps) {
  return (
    <>
      {canTake && (
        <Button
          variant="ghost"
          isPending={isTaking}
          isDisabled={isTaking}
          onClick={onTake}
        >
          <Icon name="eye" size={18} />
          Взять на ревью
        </Button>
      )}
      <Button
        variant="secondary"
        onClick={() =>
          onGrade({
            mode: "create",
            verdict: "CHANGES_REQUESTED",
            previousScore: lastScore,
          })
        }
      >
        <Icon name="rotate-ccw" size={18} />
        На доработку
      </Button>
      <Button
        variant="primary"
        onClick={() =>
          onGrade({
            mode: "create",
            verdict: "ACCEPTED",
            previousScore: lastScore,
          })
        }
      >
        <Icon name="check" size={18} />
        Зачесть
      </Button>
    </>
  );
}
