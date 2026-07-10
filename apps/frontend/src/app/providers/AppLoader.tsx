import { meQuery, telegramQuery } from "@/entities";
import { useQueryClient } from "@tanstack/react-query";
import { StartSpinner } from "@/shared/ui/start-spinner";
import { type ReactNode, useEffect, useState } from "react";

export function AppLoader({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      queryClient.prefetchQuery(meQuery()),
      queryClient.prefetchQuery(telegramQuery()),
    ]).finally(() => setIsLoading(false));
  }, [isLoading]);

  if (isLoading) return <StartSpinner />;

  return <>{children}</>;
}
