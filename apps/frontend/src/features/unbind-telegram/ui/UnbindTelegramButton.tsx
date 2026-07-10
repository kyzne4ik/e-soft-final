import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useUnbindTelegram } from "../model/useUnbindTelegram";

export interface UnbindTelegramButtonProps {
  label?: string;
}

export function UnbindTelegramButton({
  label = "Отвязать Telegram",
}: UnbindTelegramButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { unbindTelegram, isPending } = useUnbindTelegram({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Telegram отвязан" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при отвязке Telegram",
      });
    },
  });

  return (
    <>
      <Tooltip text={label} position="left">
        <Button isIconOnly variant="ghost" aria-label={label} onClick={onOpen}>
          <Icon name="unlink" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Отвязка Telegram"
        description="Отвязать Telegram от профиля? Вы перестанете получать личные уведомления в Telegram."
        confirmLabel="Отвязать"
        tone="danger"
        isPending={isPending}
        onConfirm={() => unbindTelegram()}
      />
    </>
  );
}
