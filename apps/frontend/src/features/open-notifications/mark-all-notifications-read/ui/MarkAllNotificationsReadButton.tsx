import { Button } from "@repo/ui/atoms/button";
import type { ButtonProps } from "@repo/ui/atoms/button";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useMarkAllNotificationsRead } from "../model/useMarkAllNotificationsRead";

export type MarkAllNotificationsReadButtonProps = Omit<
  ButtonProps,
  "type" | "children" | "isPending" | "onClick"
>;

export function MarkAllNotificationsReadButton({
  variant = "ghost",
  size = "sm",
  ...rest
}: MarkAllNotificationsReadButtonProps) {
  const { getToast } = useToast();

  const { markAllRead, isPending } = useMarkAllNotificationsRead({
    async onSuccess() {
      await getToast({
        type: "success",
        message: "Все уведомления отмечены прочитанными",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Не удалось отметить уведомления",
      });
    },
  });

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      isIconOnly
      aria-label="Отметить всё прочитанным"
      isPending={isPending}
      isDisabled={isPending}
      onClick={() => markAllRead()}
      {...rest}
    >
      Отметить всё прочитанным
    </Button>
  );
}
