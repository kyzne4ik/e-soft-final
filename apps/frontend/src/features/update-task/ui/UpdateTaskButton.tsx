import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import type { TaskResponse } from "@repo/schemas";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import type { UpdateTaskFormData } from "../model/types";
import { UpdateTaskForm } from "./UpdateTaskForm";
import { UpdateTaskModal } from "./UpdateTaskModal";

export interface UpdateTaskButtonProps {
  task: TaskResponse;
}

export function UpdateTaskButton({ task }: UpdateTaskButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <UpdateTaskForm task={task} onSuccess={onClose}>
      <Tooltip text="Редактировать задачу" position="left">
        <BaseUpdateTaskButton onOpen={onOpen} />
      </Tooltip>
      <UpdateTaskModal isOpen={isOpen} onClose={onClose} />
    </UpdateTaskForm>
  );
}

function BaseUpdateTaskButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<UpdateTaskFormData>();

  return (
    <Button
      isIconOnly
      variant="ghost"
      aria-label="Редактировать задачу"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="pencil" size={18} />
    </Button>
  );
}
