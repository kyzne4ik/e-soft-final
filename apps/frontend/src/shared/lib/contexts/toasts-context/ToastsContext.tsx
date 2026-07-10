import { createStrictContext, useStrictContext } from "@repo/ui/libs/react";

export type ToastType = "success" | "error" | "info";

export type ToastParams = {
  message: string;
  type?: ToastType;
};

export type ToastContextValue = {
  getToast: (params: ToastParams) => Promise<boolean>;
  closeToast: (id: number) => void;
};

export const toastsContext = createStrictContext<ToastContextValue>();

export const useToast = () => useStrictContext(toastsContext);
