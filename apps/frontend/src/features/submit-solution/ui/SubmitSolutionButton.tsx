import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import type { SubmitSolutionFormData } from "../model/types";
import { SubmitSolutionForm } from "./SubmitSolutionForm";
import { SubmitSolutionModal } from "./SubmitSolutionModal";

export interface SubmitSolutionButtonProps {
  taskId: number;
}

export function SubmitSolutionButton({ taskId }: SubmitSolutionButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <SubmitSolutionForm taskId={taskId} onSuccess={onClose}>
      <Tooltip text="Сдать решение" position="bottom">
        <BaseSubmitSolutionButton onOpen={onOpen} />
      </Tooltip>
      <SubmitSolutionModal isOpen={isOpen} onClose={onClose} />
    </SubmitSolutionForm>
  );
}

function BaseSubmitSolutionButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<SubmitSolutionFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Сдать решение"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="upload" size={18} />
    </Button>
  );
}
