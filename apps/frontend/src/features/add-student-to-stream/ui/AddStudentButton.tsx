import { Button } from "@repo/ui/atoms/button";
import { Icon } from "@repo/ui/atoms/icon";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import { useFormContext } from "react-hook-form";
import type { AddStudentFormData } from "../model/types";
import { AddStudentForm } from "./AddStudentForm";
import { AddStudentModal } from "./AddStudentModal";

export interface AddStudentButtonProps {
  streamId: number;
}

export function AddStudentButton({ streamId }: AddStudentButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AddStudentForm streamId={streamId} onSuccess={onClose}>
      <Tooltip text="Добавить студента" position="bottom_right">
        <BaseAddStudentButton onOpen={onOpen} />
      </Tooltip>
      <AddStudentModal isOpen={isOpen} onClose={onClose} />
    </AddStudentForm>
  );
}

function BaseAddStudentButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<AddStudentFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Добавить студента"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="user-plus" size={18} />
    </Button>
  );
}
