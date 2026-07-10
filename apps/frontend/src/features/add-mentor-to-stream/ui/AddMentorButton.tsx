import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import { AddMentorForm } from "./AddMentorForm";
import { useFormContext } from "react-hook-form";
import { AddMentorModal } from "./AddMentorModal";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import type { AddMentorFormData } from "../model/types";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";

export interface AddMentorButtonProps {
  streamId: number;
}

export function AddMentorButton({ streamId }: AddMentorButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <AddMentorForm streamId={streamId}>
      <Tooltip text="Добавить ментора" position="bottom_right">
        <BaseAddMentorButton onOpen={onOpen} />
      </Tooltip>
      <AddMentorModal isOpen={isOpen} onClose={onClose} />
    </AddMentorForm>
  );
}

function BaseAddMentorButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<AddMentorFormData>();

  return (
    <Button
      isIconOnly
      aria-label="Добавить ментора"
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      onClick={onOpen}
    >
      <Icon name="user-plus" size={18} />
    </Button>
  );
}
