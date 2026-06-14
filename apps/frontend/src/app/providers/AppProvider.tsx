import type { ReactNode } from "react";
import { ToastsProvider } from "./ToastsProvider";

export function AppProvider({ children }: { children: ReactNode }) {
  return <ToastsProvider>{children}</ToastsProvider>;
}
