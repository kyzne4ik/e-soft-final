import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import { CreateTaskForm } from "./CreateTaskForm";
import { CreateTaskModal } from "./CreateTaskModal";
import type { CreateTaskFormData } from "../model/types";

export interface CreateTaskButtonProps {
  streamId: number;
}

export function CreateTaskButton({ streamId }: CreateTaskButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateTaskForm streamId={streamId} onSuccess={onClose}>
      <Tooltip text="Новая задача" position="bottom_right">
        <BaseCreateTaskButton onOpen={onOpen} />
      </Tooltip>
      <CreateTaskModal isOpen={isOpen} onClose={onClose} />
    </CreateTaskForm>
  );
}

function BaseCreateTaskButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<CreateTaskFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Новая задача"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="plus" size={18} />
    </Button>
  );
}
