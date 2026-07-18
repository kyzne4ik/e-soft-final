import { Icon } from "@repo/ui/atoms/icon";
import { Button } from "@repo/ui/atoms/button";
import { Tooltip } from "@repo/ui/molecules/tooltip";
import { CreateLessonForm } from "./CreateLessonForm";
import { CreateLessonModal } from "./CreateLessonModal";
import { useDisclosure } from "@repo/ui/hooks/use-disclosure";
import type { CreateLessonFormData } from "../model/types";
import { useFormContext } from "react-hook-form";

export interface CreateLessonButtonProps {
  streamId: number;
}

export function CreateLessonButton({ streamId }: CreateLessonButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CreateLessonForm streamId={streamId} onSuccess={onClose}>
      <Tooltip text="Новое занятие" position="bottom_right">
        <BaseCreateLessonButton onOpen={onOpen} />
      </Tooltip>
      <CreateLessonModal isOpen={isOpen} onClose={onClose} />
    </CreateLessonForm>
  );
}

function BaseCreateLessonButton({ onOpen }: { onOpen: () => void }) {
  const { formState } = useFormContext<CreateLessonFormData>();

  return (
    <Button
      isIconOnly
      isPending={formState.isSubmitting}
      isDisabled={formState.isSubmitting}
      aria-label="Новое занятие"
      onClick={onOpen}
    >
      <Icon name="plus" size={18} />
    </Button>
  );
}
