import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { TaskQuery, TaskResponse } from "@repo/schemas";
import { tasksQuery } from "@/entities/tasks";
import { TABLE_DEFAULT_LIMIT } from "@/shared/consts";

interface TasksMeta {
  page: number;
  limit: number;
  total: number;
}

interface PaginatedTasksResponse {
  data: TaskResponse[];
  meta: TasksMeta;
}

export function useTasksQuery(
  streamId: number,
  query?: Omit<TaskQuery, "streamId">,
) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    ...tasksQuery({ ...query, streamId, page, limit: TABLE_DEFAULT_LIMIT }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const response = data as { data: PaginatedTasksResponse } | undefined;
  const tasks: TaskResponse[] = response?.data?.data ?? [];
  const meta: TasksMeta | undefined = response?.data?.meta;

  return { tasks, meta, isLoading, isFetching, page, setPage };
}
