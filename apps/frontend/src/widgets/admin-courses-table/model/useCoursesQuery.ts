import { useState } from "react";
import { coursesQuery } from "@/entities/courses";
import { TABLE_DEFAULT_LIMIT } from "@/shared/consts";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export function useCoursesQuery() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    ...coursesQuery({ page, limit: TABLE_DEFAULT_LIMIT }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const courses = data?.data ?? [];
  const meta = data?.meta;

  return { courses, meta, isLoading, isFetching, page, setPage };
}
