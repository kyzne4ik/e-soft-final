import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useDeleteCourse } from "../model/useDeleteCourse";

export interface DeleteCourseButtonProps {
  courseId: number;
  courseName?: string;
}

export function DeleteCourseButton({
  courseId,
  courseName,
}: DeleteCourseButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { deleteCourse, isPending } = useDeleteCourse({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Курс удалён" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при удалении курса",
      });
    },
  });

  return (
    <>
      <Tooltip text="Удалить курс" position="left">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Удалить курс"
          onClick={onOpen}
        >
          <Icon name="trash-2" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Удаление курса"
        description={
          <>
            Вы уверены, что хотите удалить курс
            {courseName ? ` «${courseName}»` : ""}? Это действие необратимо.
          </>
        }
        confirmLabel="Удалить"
        tone="danger"
        isPending={isPending}
        onConfirm={() => deleteCourse(courseId)}
      />
    </>
  );
}
