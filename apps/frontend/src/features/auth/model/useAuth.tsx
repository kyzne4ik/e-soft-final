import { meQuery } from "@/entities/auth";
import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  const { data, isSuccess: isAuth, isLoading } = useQuery(meQuery());

  return { isAuth, isLoading, data };
}
