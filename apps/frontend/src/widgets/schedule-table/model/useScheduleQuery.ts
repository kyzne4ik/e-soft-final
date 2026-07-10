import { useState } from "react";
import { lessonsQuery } from "@/entities/schedule";
import { TABLE_DEFAULT_LIMIT } from "@/shared/consts";
import type { LessonQuery, LessonsResponse } from "@repo/schemas";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export function useScheduleQuery(
  streamId: number,
  query?: Omit<LessonQuery, "streamId">,
) {
  const [page, setPage] = useState(1);

  const {
    data: lessonsRes,
    isLoading,
    isFetching,
  } = useQuery({
    ...lessonsQuery({ ...query, streamId, page, limit: TABLE_DEFAULT_LIMIT }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const lessons: LessonsResponse[] = lessonsRes?.data ?? [];
  const meta = lessonsRes?.meta;

  return { lessons, meta, isLoading, isFetching, page, setPage };
}
