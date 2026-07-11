import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useDeleteLesson } from "../model/useDeleteLesson";

export interface DeleteLessonButtonProps {
  lessonId: number;
  lessonTitle?: string;
  onDeleted?: () => void;
}

export function DeleteLessonButton({
  lessonId,
  lessonTitle,
  onDeleted,
}: DeleteLessonButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { deleteLesson, isPending } = useDeleteLesson({
    async onSuccess() {
      onClose();
      onDeleted?.();
      await getToast({ type: "success", message: "Занятие удалено" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при удалении занятия",
      });
    },
  });

  return (
    <>
      <Tooltip text="Удалить занятие" position="left">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Удалить занятие"
          onClick={onOpen}
        >
          <Icon name="trash-2" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Удаление занятия"
        description={
          <>
            Вы уверены, что хотите удалить занятие
            {lessonTitle ? ` «${lessonTitle}»` : ""}? Это действие необратимо.
          </>
        }
        confirmLabel="Удалить"
        tone="danger"
        isPending={isPending}
        onConfirm={() => deleteLesson(lessonId)}
      />
    </>
  );
}
