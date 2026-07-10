import { useState } from "react";
import { usersQuery } from "@/entities/user";
import type { UserQuery } from "@repo/schemas";
import { TABLE_DEFAULT_LIMIT } from "@/shared/consts";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export function useUsersQuery(query?: UserQuery) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    ...usersQuery({ ...query, page, limit: TABLE_DEFAULT_LIMIT }),
    placeholderData: keepPreviousData,
    throwOnError: true,
  });

  const users = data?.data.data ?? [];
  const meta = data?.data.meta;

  return { users, meta, isLoading, isFetching, page, setPage };
}
