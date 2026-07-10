import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useStartStream } from "../model/useStartStream";

export interface StartStreamButtonProps {
  streamId: number;
}

export function StartStreamButton({ streamId }: StartStreamButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { startStream, isPending } = useStartStream({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Поток запущен" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при запуске потока",
      });
    },
  });

  return (
    <>
      <Tooltip text="Запустить поток" position="bottom_right">
        <Button isIconOnly aria-label="Запустить поток" onClick={onOpen}>
          <Icon name="play" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Запуск потока"
        description="Запустить поток? Он перейдёт в статус «Идёт», после этого набор закрывается."
        confirmLabel="Запустить"
        isPending={isPending}
        onConfirm={() => startStream(streamId)}
      />
    </>
  );
}
