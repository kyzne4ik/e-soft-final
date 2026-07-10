import type { ReactNode } from "react";
import { AppLoader } from "./AppLoader";
import { ToastsProvider } from "./ToastsProvider";
import { queryClient } from "@/shared/config/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastsProvider>
        <AppLoader>{children}</AppLoader>
      </ToastsProvider>
    </QueryClientProvider>
  );
}
