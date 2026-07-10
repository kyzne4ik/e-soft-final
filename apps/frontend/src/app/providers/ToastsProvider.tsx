import { useCallback, useRef, useState, type ReactNode } from "react";
import { Toast } from "@repo/ui/molecules/toast";
import {
  toastsContext,
  type ToastParams,
  type ToastType,
} from "@/shared/contexts/toasts-context";
import { withPortal } from "@/shared/hocs";

const AUTO_DISMISS_MS = 4000;

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

const viewportStyle = {
  position: "fixed",
  bottom: 24,
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 200,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  alignItems: "center",
} as const;

export function ToastsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);
  const nextId = useRef(0);
  const resolvers = useRef(new Map<number, (value: boolean) => void>());

  const closeToast = useCallback((id: number) => {
    const resolve = resolvers.current.get(id);
    if (resolve) {
      resolvers.current.delete(id);
      resolve(true);
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getToast = useCallback(
    ({ message, type = "info" }: ToastParams) =>
      new Promise<boolean>((resolve) => {
        const id = nextId.current++;
        resolvers.current.set(id, resolve);
        setItems((prev) => [...prev, { id, message, type }]);
        setTimeout(() => closeToast(id), AUTO_DISMISS_MS);
      }),
    [closeToast],
  );

  const Toasts = withPortal(function () {
    return (
      <div style={viewportStyle}>
        {items.map((item) => (
          <Toast
            key={item.id}
            type={item.type}
            message={item.message}
            onClose={() => closeToast(item.id)}
          />
        ))}
      </div>
    );
  }, "toasts");

  return (
    <toastsContext.Provider value={{ getToast, closeToast }}>
      <Toasts />
      {children}
    </toastsContext.Provider>
  );
}
