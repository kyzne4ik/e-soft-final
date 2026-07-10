import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useDeleteStream } from "../model/useDeleteStream";

export interface DeleteStreamButtonProps {
  streamId: number;
  streamName?: string;
  onDeleted?: () => void;
}

export function DeleteStreamButton({
  streamId,
  streamName,
  onDeleted,
}: DeleteStreamButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { deleteStream, isPending } = useDeleteStream({
    async onSuccess() {
      onClose();
      onDeleted?.();
      await getToast({ type: "success", message: "Поток удалён" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при удалении потока",
      });
    },
  });

  return (
    <>
      <Tooltip text="Удалить поток" position="top">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Удалить поток"
          onClick={onOpen}
        >
          <Icon name="trash-2" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Удаление потока"
        description={
          <>
            Вы уверены, что хотите удалить поток
            {streamName ? ` «${streamName}»` : ""}? Это действие необратимо.
          </>
        }
        confirmLabel="Удалить"
        tone="danger"
        isPending={isPending}
        onConfirm={() => deleteStream(streamId)}
      />
    </>
  );
}
