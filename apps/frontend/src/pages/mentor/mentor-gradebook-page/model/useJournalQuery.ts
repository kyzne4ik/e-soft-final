import { useQuery } from "@tanstack/react-query";
import type { MentorJournalRow } from "@repo/schemas";
import { mentorJournalQuery } from "@/entities/submissions";

export function useJournalQuery(streamId: number) {
  const { data, isLoading } = useQuery({
    ...mentorJournalQuery(streamId),
    throwOnError: true,
  });

  const rows = (data ?? []) as MentorJournalRow[];

  return { rows, isLoading };
}
