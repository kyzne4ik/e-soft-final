import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useUnbindStreamTelegram } from "../model/useUnbindStreamTelegram";

export interface UnbindStreamTelegramButtonProps {
  streamId: number;
}

export function UnbindStreamTelegramButton({
  streamId,
}: UnbindStreamTelegramButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { unbindStreamTelegram, isPending } = useUnbindStreamTelegram({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Telegram-канал отвязан" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при отвязке канала",
      });
    },
  });

  return (
    <>
      <Tooltip text="Отвязать Telegram-канал" position="left">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Отвязать Telegram-канал"
          onClick={onOpen}
        >
          <Icon name="unlink" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Отвязка Telegram-канала"
        description="Отвязать Telegram-канал от потока? Уведомления в канал перестанут отправляться."
        confirmLabel="Отвязать"
        tone="danger"
        isPending={isPending}
        onConfirm={() => unbindStreamTelegram(streamId)}
      />
    </>
  );
}
