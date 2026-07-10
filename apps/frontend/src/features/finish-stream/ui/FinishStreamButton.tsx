import { Button } from "@repo/ui/atoms/button";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useFinishStream } from "../model/useFinishStream";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { Icon } from "@repo/ui/atoms/icon";

export interface FinishStreamButtonProps {
  streamId: number;
}

export function FinishStreamButton({ streamId }: FinishStreamButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { finishStream, isPending } = useFinishStream({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Поток завершён" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при завершении потока",
      });
    },
  });

  return (
    <>
      <Tooltip text="Завершить поток" position="bottom_right">
        <Button isIconOnly aria-label="Завершить поток" onClick={onOpen}>
          <Icon name="flag" fill="white" />
        </Button>
      </Tooltip>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Завершение потока"
        description="Завершить поток и выпустить студентов? Активные студенты получат статус «Выпущен»."
        confirmLabel="Завершить"
        isPending={isPending}
        onConfirm={() => finishStream(streamId)}
      />
    </>
  );
}
