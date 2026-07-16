import { useCallback, useRef, useState, type ReactNode } from "react";
import { Toast } from "@repo/ui/molecules/toast";
import {
  toastsContext,
  type ToastParams,
  type ToastType,
} from "@/shared/lib/contexts/toasts-context";
import { withPortal } from "@repo/ui/hocs/with-portal";

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

const ToastsPortal = ({
  items,
  closeToast,
}: {
  items: ToastItem[];
  closeToast: (id: number) => void;
}) => (
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

const Toasts = withPortal(ToastsPortal, "toasts");

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
      }),
    [closeToast],
  );

  return (
    <toastsContext.Provider value={{ getToast, closeToast }}>
      <Toasts items={items} closeToast={closeToast} />
      {children}
    </toastsContext.Provider>
  );
}
