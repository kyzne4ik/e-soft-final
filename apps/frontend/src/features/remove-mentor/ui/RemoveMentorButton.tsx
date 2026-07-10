import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useRemoveMentor } from "../model/useRemoveMentor";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";

export interface RemoveMentorButtonProps {
  streamId: number;
  mentorId: number;
  mentorName?: string;
}

export function RemoveMentorButton({
  streamId,
  mentorId,
  mentorName,
}: RemoveMentorButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { removeMentor, isPending } = useRemoveMentor({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Ментор убран из потока" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при удалении ментора",
      });
    },
  });

  return (
    <>
      <Tooltip text="Убрать ментора из потока" position="right">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Убрать ментора из потока"
          onClick={onOpen}
        >
          <Icon name="user-minus" size={18} />
        </Button>
      </Tooltip>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Удаление ментора"
        description={
          <>Убрать ментора{mentorName ? ` «${mentorName}»` : ""} из потока?</>
        }
        confirmLabel="Убрать"
        tone="danger"
        isPending={isPending}
        onConfirm={() => removeMentor({ streamId, mentorId })}
      />
    </>
  );
}
