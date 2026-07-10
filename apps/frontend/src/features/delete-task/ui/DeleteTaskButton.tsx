import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { ConfirmModal } from "@repo/ui/organisms/confirm-modal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useToast } from "@/shared/lib/contexts/toasts-context";
import { useDeleteTask } from "../model/useDeleteTask";

export interface DeleteTaskButtonProps {
  taskId: number;
  taskTitle?: string;
}

export function DeleteTaskButton({ taskId, taskTitle }: DeleteTaskButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getToast } = useToast();

  const { deleteTask, isPending } = useDeleteTask({
    async onSuccess() {
      onClose();
      await getToast({ type: "success", message: "Задача удалена" });
    },
    async onError(error) {
      await getToast({
        type: "error",
        message: error.response?.data?.message || "Ошибка при удалении задачи",
      });
    },
  });

  return (
    <>
      <Tooltip text="Удалить задачу" position="left">
        <Button
          isIconOnly
          variant="ghost"
          aria-label="Удалить задачу"
          onClick={onOpen}
        >
          <Icon name="trash-2" size={18} />
        </Button>
      </Tooltip>

      <ConfirmModal
        isOpen={isOpen}
        onClose={onClose}
        title="Удаление задачи"
        description={
          <>
            Вы уверены, что хотите удалить задачу
            {taskTitle ? ` «${taskTitle}»` : ""}? Это действие необратимо.
          </>
        }
        confirmLabel="Удалить"
        tone="danger"
        isPending={isPending}
        onConfirm={() => deleteTask(taskId)}
      />
    </>
  );
}
