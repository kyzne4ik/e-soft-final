import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useRemoveStudent } from "../model/useRemoveStudent";
import { Tooltip } from "@repo/ui/molecules/tooltip";

export interface RemoveStudentButtonProps {
  streamId: number;
  studentId: number;
  studentName?: string;
}

export function RemoveStudentButton({
  streamId,
  studentId,
  studentName,
}: RemoveStudentButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { removeStudent, isPending } = useRemoveStudent({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Студент убран из потока" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message:
          error.response?.data?.message || "Ошибка при удалении студента",
      });
    },
  });

  return (
    <>
      <Tooltip text="Убрать студента из потока" position="left">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Убрать студента из потока"
          onClick={onOpen}
        >
          <Icon name="user-minus" size={18} />
        </Button>
      </Tooltip>
      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Удаление студента"
        description={
          <>
            Убрать студента{studentName ? ` «${studentName}»` : ""} из потока?
          </>
        }
        confirmLabel="Убрать"
        tone="danger"
        isPending={isPending}
        onConfirm={() => removeStudent({ streamId, studentId })}
      />
    </>
  );
}
