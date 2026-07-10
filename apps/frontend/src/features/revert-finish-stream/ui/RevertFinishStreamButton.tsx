import { Button } from "@repo/ui/atoms/button";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useRevertFinishStream } from "../model/useRevertFinishStream";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { Icon } from "@repo/ui/atoms/icon";

export interface RevertFinishStreamButtonProps {
  streamId: number;
}

export function RevertFinishStreamButton({
  streamId,
}: RevertFinishStreamButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { revertFinishStream, isPending } = useRevertFinishStream({
    async onSuccess() {
      onClose();
      await getToast({
        type: "success",
        message: "Завершение потока отменено",
      });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при отмене завершения",
      });
    },
  });

  return (
    <>
      <Tooltip text="Отменить завершение" position="bottom_right">
        <Button
          isIconOnly
          variant="secondary"
          aria-label="Отменить завершение"
          onClick={onOpen}
        >
          <Icon name="flag-off" />
        </Button>
      </Tooltip>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Отмена завершения потока"
        description="Вернуть поток в состояние «Идёт» и отменить выпуск студентов?"
        confirmLabel="Отменить завершение"
        isPending={isPending}
        onConfirm={() => revertFinishStream(streamId)}
      />
    </>
  );
}
