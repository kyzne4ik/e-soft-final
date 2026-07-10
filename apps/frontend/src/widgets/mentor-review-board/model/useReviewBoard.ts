import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { MentorSubmissionResponse } from "@repo/schemas";
import { mentorSubmissionsQuery } from "@/entities/submissions";
import { useChangeSubmissionStatus } from "@/features/change-submission-status";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { buildBoard } from "./board";

const unwrap = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) return value as T[];
  const lvl1 = (value as { data?: unknown } | null | undefined)?.data;
  if (Array.isArray(lvl1)) return lvl1 as T[];
  const lvl2 = (lvl1 as { data?: unknown } | null | undefined)?.data;
  if (Array.isArray(lvl2)) return lvl2 as T[];
  return [];
};

export function useReviewBoard(streamId: number) {
  const { getToast } = useToast();
  const [version, setVersion] = useState(0);

  const { data, isLoading, dataUpdatedAt } = useQuery({
    ...mentorSubmissionsQuery({ streamId, limit: 100 }),
    throwOnError: true,
  });

  const submissions = useMemo(
    () => unwrap<MentorSubmissionResponse>(data),
    [data],
  );
  const board = useMemo(() => buildBoard(submissions), [submissions]);

  const { changeStatus } = useChangeSubmissionStatus({
    async onError(error) {
      setVersion((v) => v + 1);
      await getToast({
        type: "error",
        message:
          (error as { response?: { data?: { message?: string } } }).response
            ?.data?.message || "Не удалось изменить статус",
      });
    },
  });

  const handleMove = (cardId: string, from: string, to: string) => {
    if (from === to) return;
    if (to === "REVIEWING" && (from === "NEW" || from === "RESUBMITTED")) {
      changeStatus({
        submissionId: Number(cardId),
        payload: { status: "REVIEWING" },
      });
      return;
    }
    setVersion((v) => v + 1);
    void getToast({ type: "info", message: "Оцените работу в карточке" });
  };

  return { board, isLoading, version, dataUpdatedAt, handleMove };
}
